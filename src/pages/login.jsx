import { useState } from "react";

const Login = ({ onLogin }) => {
    const [nombre, setNombre] = useState("");
    const [contra, setContra] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("https://api-usuarios-zxgt.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, contra }),
            });
            const data = await res.json();
            if (data.success) {
                onLogin();
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (err) {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-10">
                <div className="mb-8 text-center">
                    <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">👤</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Bienvenido</h1>
                    <p className="text-slate-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Usuario</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-1">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={contra}
                        onChange={(e) => setContra(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default Login;