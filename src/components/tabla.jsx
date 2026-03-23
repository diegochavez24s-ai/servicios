const Tabla = ({ columnas, datos, onEditar, onEliminar }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-slate-700">
                        {columnas.map((col, i) => (
                            <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{col}</th>
                        ))}
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((fila, i) => (
                        <tr key={i} className="border-b border-slate-700 hover:bg-slate-700 transition duration-150">
                            {Object.values(fila).map((valor, j) => (
                                <td key={j} className="px-6 py-4 text-sm text-slate-300">{valor}</td>
                            ))}
                            <td className="px-6 py-4 flex gap-2">
                                <button onClick={() => onEditar(fila)} className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded-lg text-sm transition duration-150">Editar</button>
                                <button onClick={() => onEliminar(fila)} className="bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1.5 rounded-lg text-sm transition duration-150">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;