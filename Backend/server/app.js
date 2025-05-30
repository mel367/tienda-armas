// LIBRERIAS
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Utils Conexión a MongoDB
import connectDB from "../src/utils/config/ConnectMongoDB/ConnectMongoDB.js";

// Routers import
import welcomeRouter from "../src/routers/welcome/welcome.js";
import productosRouter from "../src/routers/productos/productosRouter.js";
import usuariosRouter from "../src/routers/usuarios/usuariosRouter.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// PORT
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Habilita CORS para cualquier origen
app.use(cors());

// Conecta a la base de datos
connectDB();

// EndPoints base
app.use("", welcomeRouter);
app.use("/api/v1", productosRouter);
app.use("/api/v1", usuariosRouter);

// Ruta para servir archivos estáticos (por ejemplo, imágenes)
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
