import { useState } from "react";

const Login = ({ onLogin }) => {
    const [nombre, setNombre] = useState("");
    const [contra, setContra] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError(""); 
        try {
            const res = await fetch("https://api-usuarios-zxgt.onrender.com/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, contra }),
            });

        
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error del servidor:", errorText);
                setError("Error en el servidor o ruta no encontrada");
                return;
            }

            const data = await res.json();
            
            if (data.success) {
                onLogin();
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setError("Error de conexión. Revisa que el servidor esté activo.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Sistema de Gestión</h2>
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={contra}
                        onChange={(e) => setContra(e.target.value)}
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Login;