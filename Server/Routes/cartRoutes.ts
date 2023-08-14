import express from "express";
import {
  addItemToCart,
  checkShoppingCart,
  getCartItems,
} from "../controllers/cartController";

const cartRouter = express.Router();

// add new product
cartRouter.get("/checkShoppingCart/:userId", checkShoppingCart);
cartRouter.post("/addItemToCart/:cartId", addItemToCart);
cartRouter.get("/getCartItems/:cartId", getCartItems);

export default cartRouter;
