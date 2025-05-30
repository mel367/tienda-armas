import express from "express";
import {
  CreateProduct,
  GetAllProducts,
} from "../../controllers/productos/productosController.js";

import upload from "../../middlewares/productsWithImages/productsWithImages.js";

const router = express.Router();

router.get("/get-products", GetAllProducts);
router.post("/create-product", upload.single("imagen"), CreateProduct);

export default router;
