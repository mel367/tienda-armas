import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCarrito } from "../Carrito/context/CarritoContext";
import "./ProductoDetalle.css";
import { IMAGE_SHOW } from "../utils/Url/urlUtils";

function ProductoDetalle() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito(); // ✅ Aquí usamos el contexto
  const producto = state?.producto;

  if (!producto) {
    navigate("/catalogo"); // Redirige si no hay producto
    return null;
  }

  const handleComprar = () => {
    agregarAlCarrito(producto); // ✅ Añadir al carrito correctamente
    console.log("Producto añadido desde detalle:", producto.nombre);
  };

  return (
    <div className="producto-detalle">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        &larr; Volver al catálogo
      </button>

      <div className="detalle-contenido">
        <div className="imagen-container">
          <img src={`${IMAGE_SHOW}/${producto.imagen}`} alt={producto.nombre} />
        </div>

        <div className="info-container">
          <h1>{producto.nombre}</h1>
          <p className="precio">${producto.precio}</p>
          <p className="descripcion">{producto.descripcion}</p>

          <div className="especificaciones">
            <h3>Especificaciones técnicas:</h3>
            <ul>
              <li>
                <strong>Calibre:</strong> {producto.calibre || "N/A"}
              </li>
              <li>
                <strong>Sistema de disparo:</strong> {producto.SistemaDeDisparo}
              </li>
              <li>
                <strong>Longitud:</strong> {producto.longitud || "N/A"}
              </li>
              <li>
                <strong>Peso:</strong> {producto.peso || "N/A"}
              </li>
              <li>
                <strong>Capacidad:</strong> {producto.capacidad || "N/A"}
              </li>
            </ul>
          </div>

          <button className="btn-comprar" onClick={handleComprar}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
