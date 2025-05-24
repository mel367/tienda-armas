import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarUsuario, buscarUsuarioPorEmail } from "../utils/indexedDB";

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

  const encriptarPassword = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarCampos()) return;

    const userExistente = await buscarUsuarioPorEmail(email);
    if (userExistente) {
      setError("El usuario ya está registrado");
      return;
    }

    const passwordHash = await encriptarPassword(password);

    await agregarUsuario({
      email,
      password: passwordHash,
    });

    alert("Registro exitoso, puedes iniciar sesión");
    navigate("/login");
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
