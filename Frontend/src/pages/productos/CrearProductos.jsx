import { useState } from "react";

export const CrearProductos = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    calibre: "",
    sistemaDeDisparo: "",
    longitud: "",
    peso: "",
    capacidad: "",
  });
  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imagen) {
      formData.append("imagen", imagen);
    }

    const URL = window.location.hostname.includes("localhost")
      ? "http://localhost:3000"
      : "https://3000-firebase-tienda-armasgit-1748497386001.cluster-aj77uug3sjd4iut4ev6a4jbtf2.cloudworkstations.dev";

    try {
      const response = await fetch(`${URL}/api/v1/create-product`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Producto creado:", data);
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <div>
      <h2>Crear productos</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="calibre"
          placeholder="Calibre"
          onChange={handleChange}
        />
        <input
          type="text"
          name="sistemaDeDisparo"
          placeholder="Sistema de disparo"
          onChange={handleChange}
        />
        <input
          type="text"
          name="longitud"
          placeholder="Longitud"
          onChange={handleChange}
        />
        <input
          type="text"
          name="peso"
          placeholder="Peso"
          onChange={handleChange}
        />
        <input
          type="text"
          name="capacidad"
          placeholder="Capacidad"
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Crear producto</button>
      </form>
    </div>
  );
};
