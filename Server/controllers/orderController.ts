import { Request, Response } from "express";
import { Order, OrderModel } from "../Models/Store";

// Function to create an order in database
export const createOrder = async (req: Request, res: Response) => {
  const orderDetails: Order = req.body;
  try {
    const newOrder = new OrderModel(orderDetails);
    if (newOrder) {
      newOrder.save();
      res.status(200).json(newOrder);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
