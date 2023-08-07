import express from "express";
import { addProduct } from "../controllers/productController";

const productRouter = express.Router();

// add new product
productRouter.post("/addProduct", addProduct);

export default productRouter;
