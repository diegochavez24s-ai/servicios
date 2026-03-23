import { useState, useEffect } from "react";
import Modal from "../components/modal";
import Alerta from "../components/alerta";
import Tabla from "../components/tabla";

const API = "http://localhost:3000/api/usuarios";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
    const [form, setForm] = useState({ id_usuarios: "", nombre: "", contra: "" });
    const [editando, setEditando] = useState(false);

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: "", tipo: "" }), 3000);
    };

    const cargarUsuarios = async () => {
        const res = await fetch(`${API}/obtener`);
        const data = await res.json();
        setUsuarios(data);
    };

    useEffect(() => { cargarUsuarios(); }, []);

    const abrirModal = () => {
        setForm({ id_usuarios: "", nombre: "", contra: "" });
        setEditando(false);
        setModalOpen(true);
    };

    const handleEditar = (usuario) => {
        setForm(usuario);
        setEditando(true);
        setModalOpen(true);
    };

    const handleEliminar = async (usuario) => {
        await fetch(`${API}/eliminar/${usuario.id_usuarios}`, { method: "DELETE" });
        mostrarAlerta("Usuario eliminado correctamente", "error");
        cargarUsuarios();
    };

    const handleGuardar = async () => {
        if (!form.nombre || !form.contra) {
            mostrarAlerta("Todos los campos son obligatorios", "error");
            return;
        }
        if (editando) {
            await fetch(`${API}/actualizar/${form.id_usuarios}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: form.nombre, contra: form.contra }),
            });
            mostrarAlerta("Usuario actualizado correctamente", "exito");
        } else {
            await fetch(`${API}/insertar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            mostrarAlerta("Usuario agregado correctamente", "exito");
        }
        setModalOpen(false);
        cargarUsuarios();
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Usuarios</h1>
                        <p className="text-slate-500 text-sm mt-1">Gestión de usuarios del sistema</p>
                    </div>
                    <button onClick={abrirModal} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition duration-200">
                        + Nuevo Usuario
                    </button>
                </div>

                <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} onClose={() => setAlerta({ mensaje: "", tipo: "" })} />

                <div className="bg-slate-800 rounded-2xl border border-slate-700">
                    <Tabla
                        columnas={["ID", "Nombre", "Contraseña"]}
                        datos={usuarios}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                    />
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editando ? "Editar Usuario" : "Nuevo Usuario"}>
                <input type="number" placeholder="ID Usuario" value={form.id_usuarios}
                    onChange={(e) => setForm({ ...form, id_usuarios: e.target.value })}
                    autoComplete="off"
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400"
                    disabled={editando} />
                <input type="text" placeholder="Nombre" value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    autoComplete="off"
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                <input type="password" placeholder="Contraseña" value={form.contra}
                    onChange={(e) => setForm({ ...form, contra: e.target.value })}
                    autoComplete="new-password"
                    className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 mb-5 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                <button onClick={handleGuardar}
                    className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2.5 rounded-lg font-medium transition duration-200">
                    {editando ? "Actualizar" : "Guardar"}
                </button>
            </Modal>
        </div>
    );
};

export default Usuarios;