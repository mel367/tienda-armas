import React from "react";
import ProductoList from "../Productos/ProductoList/ProductoList";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-overlay" />
      <div className="home-content fade-in">
        <h1>Bienvenido a tu tienda de armas de confianza</h1>
        <p>Disparando precios y tambien balas</p>
      </div>
    </div>
  );
}

export default Home;
