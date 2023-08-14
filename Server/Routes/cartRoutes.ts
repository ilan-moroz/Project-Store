import express from "express";
import {
  addItemToCart,
  checkShoppingCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartController";

const cartRouter = express.Router();

// add new product
cartRouter.get("/checkShoppingCart/:userId", checkShoppingCart);
cartRouter.post("/addItemToCart/:cartId", addItemToCart);
cartRouter.get("/getCartItems/:cartId", getCartItems);
cartRouter.put("/updateCartItem", updateCartItem);
cartRouter.delete("/deleteCartItem/:cartId/:productId", deleteCartItem);

export default cartRouter;
