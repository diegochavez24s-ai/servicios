import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                </div>
                <h1 className="text-lg font-bold tracking-wide">Sistema de Gestión</h1>
            </div>
            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/empleados")}
                    className="text-slate-300 hover:text-white text-sm font-medium transition duration-200 hover:underline underline-offset-4"
                >
                    Empleados
                </button>
                <button
                    onClick={() => navigate("/usuarios")}
                    className="text-slate-300 hover:text-white text-sm font-medium transition duration-200 hover:underline underline-offset-4"
                >
                    Usuarios
                </button>
                <button
                    onClick={onLogout}
                    className="bg-slate-700 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg transition duration-200"
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
};

export default Navbar;