import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController";
import upload from "../middleware/upload";

const productRouter = express.Router();

// add new product
productRouter.post("/addProduct", upload.single("imagePath"), addProduct);
productRouter.get("/getAllProducts", getAllProducts);

export default productRouter;
