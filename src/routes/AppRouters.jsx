import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "../pages/login";
import Empleados from "../pages/empleados";
import Usuarios from "../pages/usuarios";
import Navbar from "../components/navbar";
const AppRouters = () => {
    const [logueado, setLogueado] = useState(false);

    return (
    <BrowserRouter>
        {logueado && <Navbar onLogout={() => setLogueado(false)} />}
        <Routes>
            <Route path="/" element={!logueado ? <Login onLogin={() => setLogueado(true)} /> : <Navigate to="/empleados" />} />
            <Route path="/empleados" element={logueado ? <Empleados /> : <Navigate to="/" />} />
            <Route path="/usuarios" element={logueado ? <Usuarios /> : <Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);
};

export default AppRouters;