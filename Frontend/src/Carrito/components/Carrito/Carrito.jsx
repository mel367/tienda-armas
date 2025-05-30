import React from "react";
import { useCarrito } from "../../context/CarritoContext";
import "./css/Carrito.css";

import { IMAGE_SHOW } from "../../../utils/Url/urlUtils";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, total } =
    useCarrito();

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="carrito-items">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <img
                  src={`${IMAGE_SHOW}/${item.imagen}`}
                  alt={item.nombre}
                />
                <div className="item-info">
                  <h3>{item.nombre}</h3>
                  <p>${item.precio} c/u</p>
                  <div className="cantidad-control">
                    <button
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="eliminar-btn"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="carrito-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="btn-comprar">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
