import express from "express";
import {
  addProduct,
  editProduct,
  getAllProducts,
  searchProducts,
} from "../controllers/productController";
import upload from "../middleware/upload";

const productRouter = express.Router();

// add new product
productRouter.post("/addProduct", upload.single("imagePath"), addProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/searchProducts", searchProducts);
productRouter.put("/editProduct", editProduct);

export default productRouter;
