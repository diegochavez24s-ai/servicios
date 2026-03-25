import { useState, useEffect } from "react";
import Modal from "../components/modal";
import Alerta from "../components/alerta";
import Tabla from "../components/tabla";

const API_BASE = import.meta.env.VITE_API_URL || "https://api-usuarios-zxgt.onrender.com";
const API = `${API_BASE}/usuarios`;

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
    const [form, setForm] = useState({ id_usuario: "", nombre: "", email: "", rol: "" });
    const [editando, setEditando] = useState(false);

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => setAlerta({ mensaje: "", tipo: "" }), 3000);
    };

    const cargarUsuarios = async () => {
        try {
            const res = await fetch(`${API}/obtener`);
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error:", error);
            mostrarAlerta("Error al conectar con el servidor", "error");
        }
    };

    useEffect(() => { cargarUsuarios(); }, []);

    const abrirModal = () => {
        setForm({ id_usuario: "", nombre: "", email: "", rol: "" });
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
                await fetch(`${API}/eliminar/${usuario.id_usuario}`, { method: "DELETE" });
                mostrarAlerta("Usuario eliminado", "error");
                cargarUsuarios();
            } catch (error) {
                mostrarAlerta("No se pudo eliminar", "error");
            }
        }
    };

    const handleGuardar = async () => {
        if (!form.nombre || !form.email || !form.rol) {
            mostrarAlerta("Todos los campos son obligatorios", "error");
            return;
        }

        const url = editando ? `${API}/actualizar/${form.id_usuario}` : `${API}/insertar`;
        const metodo = editando ? "PUT" : "POST";

        try {
            await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            mostrarAlerta(editando ? "Usuario actualizado" : "Usuario creado", "exito");
            setModalOpen(false);
            cargarUsuarios();
        } catch (error) {
            mostrarAlerta("Error en la operación", "error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Usuarios del Sistema</h1>
                        <p className="text-slate-500 text-sm mt-1">Administración de accesos</p>
                    </div>
                    <button onClick={abrirModal} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition duration-200">
                        + Nuevo Usuario
                    </button>
                </div>

                <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} onClose={() => setAlerta({ mensaje: "", tipo: "" })} />

                <div className="bg-slate-800 rounded-2xl border border-slate-700">
                    <Tabla
                        columnas={["ID", "Nombre", "Email", "Rol"]}
                        datos={usuarios}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                    />
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editando ? "Editar Usuario" : "Nuevo Usuario"}>
                <div className="space-y-4">
                    <input type="text" placeholder="Nombre" value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                    
                    <input type="email" placeholder="Correo Electrónico" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-slate-400" />
                    
                    <select value={form.rol}
                        onChange={(e) => setForm({ ...form, rol: e.target.value })}
                        className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400">
                        <option value="">Selecciona un Rol</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                    
                    <button onClick={handleGuardar}
                        className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2.5 rounded-lg font-medium transition duration-200">
                        {editando ? "Guardar Cambios" : "Crear Usuario"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Usuarios;