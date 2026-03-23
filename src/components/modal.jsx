const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-700">
                <input type="password" style={{display: 'none'}} />
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-400 text-2xl font-bold transition duration-150">×</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;