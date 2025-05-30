import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../utils/Url/urlUtils";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validarCampos = () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (!email.includes("@")) {
      setError("Correo no válido");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarCampos()) return;

    try {
      const res = await fetch(`${REGISTER_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contraseña: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      // Puedes guardar el token en localStorage si lo deseas
      localStorage.setItem("token", data.token);

      alert("Registro exitoso");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}

export default Register;
