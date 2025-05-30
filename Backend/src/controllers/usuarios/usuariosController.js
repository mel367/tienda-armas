import User from "../../models/usuarios/usuariosModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const RegisterUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son obligatorios" });
    }

    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new User({ email, contraseña: hash });
    await nuevoUsuario.save();

    const token = jwt.sign(
      { id: nuevoUsuario._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "Registro exitoso",
      usuario: { id: nuevoUsuario._id, email: nuevoUsuario.email },
      token,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: usuario._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login exitoso",
      usuario: { id: usuario._id, email: usuario.email },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en login" });
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
