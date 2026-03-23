const Alerta = ({ mensaje, tipo, onClose }) => {
    if (!mensaje) return null;

    const colores = {
        exito: "bg-green-100 border-green-500 text-green-800",
        error: "bg-red-100 border-red-500 text-red-800",
        info: "bg-blue-100 border-blue-500 text-blue-800",
    };

    return (
        <div className={`border-l-4 p-4 mb-4 rounded flex justify-between items-center ${colores[tipo] || colores.info}`}>
            <span>{mensaje}</span>
            <button onClick={onClose} className="ml-4 font-bold text-lg">×</button>
        </div>
    );
};

export default Alerta;