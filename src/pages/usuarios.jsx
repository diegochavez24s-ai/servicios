import { useState, useEffect } from "react";
import Modal from "../components/modal";
import Alerta from "../components/alerta";
import Tabla from "../components/tabla";

const API = "https://api-usuarios-zxgt.onrender.com/api/usuarios";

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
        try {
            const res = await fetch(`${API}/obtener`);
            if (!res.ok) throw new Error("Error al obtener usuarios");
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error:", error);
            mostrarAlerta("Error al conectar con el servidor", "error");
        }
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
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                await fetch(`${API}/eliminar/${usuario.id_usuarios}`, { method: "DELETE" });
                mostrarAlerta("Usuario eliminado", "exito");
                cargarUsuarios();
            } catch (error) {
                mostrarAlerta("Error al eliminar", "error");
            }
        }
    };

    const handleGuardar = async () => {
        if (!form.nombre || !form.contra) {
            mostrarAlerta("Nombre y contraseña son obligatorios", "error");
            return;
        }
        const url = editando ? `${API}/actualizar/${form.id_usuarios}` : `${API}/insertar`;
        const metodo = editando ? "PUT" : "POST";
        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                mostrarAlerta(editando ? "Usuario actualizado" : "Usuario creado", "exito");
                setModalOpen(false);
                cargarUsuarios();
            }
        } catch (error) {
            mostrarAlerta("Error al procesar", "error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Usuarios del Sistema</h1>
                    <button onClick={abrirModal} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
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
                <input type="number" placeholder="ID" value={form.id_usuarios}
                    onChange={(e) => setForm({ ...form, id_usuarios: e.target.value })}
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
                <button onClick={handleGuardar} className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2.5 rounded-lg font-medium transition duration-200">
                    {editando ? "Actualizar" : "Guardar"}
                </button>
            </Modal>
        </div>
    );
};

export default Usuarios;