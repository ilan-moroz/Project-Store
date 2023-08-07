import express from "express";
import { addProduct } from "../controllers/productController";
import upload from "../middleware/upload";

const productRouter = express.Router();

// add new product
productRouter.post("/addProduct", upload.single("image"), addProduct);

export default productRouter;
