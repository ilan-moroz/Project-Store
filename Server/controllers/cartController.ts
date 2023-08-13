import { CartItemModel, ShoppingCartModel } from "../Models/Store";
import { Request, Response } from "express";

// Function to check if user has an cart and if no create it
export const checkShoppingCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const shoppingCart = await ShoppingCartModel.findOne({ userId });
    if (shoppingCart) {
      res.status(200).json(shoppingCart);
    } else {
      const newShoppingCart = new ShoppingCartModel({ customerId: userId });
      await newShoppingCart.save();
      res.status(201).json(newShoppingCart);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// function to add new item to the cart
export const addItemToCart = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const item = req.body;

  try {
    const shoppingCart = await ShoppingCartModel.findOne({ _id: cartId });
    if (!shoppingCart) {
      return res.status(400).json({ message: "Shopping cart not found" });
    }
    const newCartItem = new CartItemModel({ ...item, cartId: cartId });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
