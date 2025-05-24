import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem("usuarioNombre");
  const { carrito } = useCarrito();

  const handleLogout = () => {
    localStorage.removeItem("usuarioNombre");
    navigate('/login');
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.jpeg" alt="Logo" className="logo-img" />
        <span>Pium Pium Store</span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/catalogo">Catálogo</Link></li>
        <li className="carrito-link">
          <Link to="/carrito">
            🛒 Carrito
            {carrito.length > 0 && (
              <span className="carrito-count">{carrito.length}</span>
            )}
          </Link>
        </li>
        <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
        {nombreUsuario ? (
          <li className="user-menu-container" ref={dropdownRef}>
            <div 
              className="username"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {nombreUsuario} <span className="dropdown-arrow">▼</span>
            </div>
              <div className={`dropdown-content 
              ${isDropdownOpen ? 'open' : ''}`}>
                <button className="logout-btn" onClick={handleLogout}>
                  → Cerrar sesión
                </button>
              </div>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;