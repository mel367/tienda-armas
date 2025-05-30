// Models
import Product from "../../models/productos/productosModel.js";

export const GetAllProducts = async (req, res) => {
  try {
    // Traer todos los productos desde mongodb
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const CreateProduct = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      calibre,
      sistemaDeDisparo,
      longitud,
      peso,
      capacidad,
    } = req.body;

    console.log("req.file", req.file)

    const imagen = req.file ? req.file.filename : "";

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      calibre,
      sistemaDeDisparo,
      longitud,
      peso,
      capacidad,
      imagen,
    });

    const savedProduct = await nuevoProducto.save();

    res.status(201).json({
      message: "Producto creado correctamente",
      producto: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};
