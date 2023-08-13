import express from "express";
import {
  addItemToCart,
  checkShoppingCart,
} from "../controllers/cartController";

const cartRouter = express.Router();

// add new product
cartRouter.get("/checkShoppingCart/:userId", checkShoppingCart);
cartRouter.post("/addItemToCart/:cartId", addItemToCart);

export default cartRouter;
