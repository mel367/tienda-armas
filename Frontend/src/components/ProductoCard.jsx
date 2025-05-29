import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function ProductoCard({ producto }) {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  const handleClick = () => {
    navigate(`/producto/${producto.id}`, { 
      state: { 
        producto: producto 
      } 
    });
  };

  const handleComprar = (e) => {
    e.stopPropagation();
    agregarAlCarrito({
      ...producto,
      cantidad: 1 // Asegúrate de incluir la cantidad
    });
    console.log('Producto añadido:', producto.nombre);
  };

  return (
    <div className="producto-card" onClick={handleClick}>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="precio">${producto.precio}</p>
      </div>
      <button 
        className="btn-comprar" 
        onClick={handleComprar}
      >
        Añadir al carrito
      </button>
    </div>
  );
}


export default ProductoCard;