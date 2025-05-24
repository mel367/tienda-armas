import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarUsuarioPorEmail } from "../utils/indexedDB"; 
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const user = await buscarUsuarioPorEmail(email);
      if (!user) {
        setError('Usuario no encontrado');
        return;
      }

      const hashedInput = await hashPassword(password);
      if (user.password !== hashedInput) {
        setError('Contraseña incorrecta');
        return;
      }

      const nombre = email.split("@")[0];
      localStorage.setItem("usuarioNombre", nombre);
      sessionStorage.setItem('user', JSON.stringify(user));

      // 🔄 Forzar actualización del Navbar
      window.dispatchEvent(new Event('storage'));

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión');
    }
  };

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Entrar</button>

        <p className="registro-link">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
