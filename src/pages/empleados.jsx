import { useState, useEffect } from "react";
import Modal from "../components/modal";
import Alerta from "../components/alerta";
import Tabla from "../components/tabla";

const API = "http://localhost:3000/api/empleados";

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
    const [form, setForm] = useState({ id_empleado: "", nombre: "", puesto: "", salario: "" });
    const [editando, setEditando] = useState(false);

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: "", tipo: "" }), 3000);
    };

    const cargarEmpleados = async () => {
        const res = await fetch(`${API}/obtener`);
        const data = await res.json();
        const formateados = data.map(e => ({
            ...e,
            salario: `$${Number(e.salario).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
        }));
        setEmpleados(formateados);
    };

    useEffect(() => { cargarEmpleados(); }, []);

    const abrirModal = () => {
        setForm({ id_empleado: "", nombre: "", puesto: "", salario: "" });
        setEditando(false);
        setModalOpen(true);
    };

    const handleEditar = (empleado) => {
        setForm(empleado);
        setEditando(true);
        setModalOpen(true);
    };

    const handleEliminar = async (empleado) => {
        await fetch(`${API}/eliminar/${empleado.id_empleado}`, { method: "DELETE" });
        mostrarAlerta("Empleado eliminado correctamente", "error");
        cargarEmpleados();
    };

    const handleGuardar = async () => {
        if (!form.nombre || !form.puesto || !form.salario) {
            mostrarAlerta("Todos los campos son obligatorios", "error");
            return;
        }
        if (editando) {
            await fetch(`${API}/actualizar/${form.id_empleado}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: form.nombre, puesto: form.puesto, salario: form.salario }),
            });
            mostrarAlerta("Empleado actualizado correctamente", "exito");
        } else {
            await fetch(`${API}/insertar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            mostrarAlerta("Empleado agregado correctamente", "exito");
        }
        setModalOpen(false);
        cargarEmpleados();
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Empleados</h1>
                        <p className="text-slate-500 text-sm mt-1">Gestión de empleados del sistema</p>
                    </div>
                    <button onClick={abrirModal} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition duration-200">
                        + Nuevo Empleado
                    </button>
                </div>

                <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} onClose={() => setAlerta({ mensaje: "", tipo: "" })} />

                <div className="bg-slate-800 rounded-2xl border border-slate-700">
                    <Tabla
                        columnas={["ID", "Nombre", "Puesto", "Salario"]}
                        datos={empleados}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                    />
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editando ? "Editar Empleado" : "Nuevo Empleado"}>
                <input type="number" placeholder="ID Empleado" value={form.id_empleado}
                    onChange={(e) => setForm({ ...form, id_empleado: e.target.value })}
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400"
                    disabled={editando} />
                <input type="text" placeholder="Nombre" value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                <input type="text" placeholder="Puesto" value={form.puesto}
                    onChange={(e) => setForm({ ...form, puesto: e.target.value })}
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                <input type="number" placeholder="Salario" value={form.salario}
                    onChange={(e) => setForm({ ...form, salario: e.target.value })}
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-5 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                <button onClick={handleGuardar}
                    className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2.5 rounded-lg font-medium transition duration-200">
                    {editando ? "Actualizar" : "Guardar"}
                </button>
            </Modal>
        </div>
    );
};

export default Empleados;