import { Request, Response } from "express";
import { Order, OrderModel } from "../Models/Store";
import { error } from "console";

// Function to create an order in database
export const createOrder = async (req: Request, res: Response) => {
  const orderDetails: Order = req.body;
  try {
    const newOrder = new OrderModel(orderDetails);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// check how many orders on specified date
export const checkOrderDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  try {
    const orders = await OrderModel.find({ deliveryDate: date });
    if (orders.length >= 3) {
      res.status(400).json({ error: "Too many orders for this date" });
    }
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
