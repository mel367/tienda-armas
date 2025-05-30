import express from "express";
import {
  LoginUser,
  RegisterUser,
  GetAllUsers,
} from "../../controllers/usuarios/usuariosController.js";
import { VerificarToken } from "../../middlewares/authUser/authUserToken.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/users", VerificarToken, GetAllUsers);

export default router;
