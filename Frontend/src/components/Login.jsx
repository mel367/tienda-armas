import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { LOGIN_USER } from "../utils/Url/urlUtils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch(`${LOGIN_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contraseña: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar el token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuarioNombre", email.split("@")[0]);
      sessionStorage.setItem("user", JSON.stringify(data.usuario));

      // 🔄 Notificar cambio para el navbar, si es necesario
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Entrar</button>

        <p className="registro-link">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
