const handleLogin = async () => {
    setError(""); 
    try {
        const res = await fetch("https://api-usuarios-zxgt.onrender.com/api/usuarios/login", {
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
        console.error(err);
        setError("Error de conexión. Revisa que el servidor esté activo.");
    }
};