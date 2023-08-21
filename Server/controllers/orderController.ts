import { Request, Response } from "express";
import { Order, OrderModel, ShoppingCartModel } from "../Models/Store";

// Function to create an order in database
export const createOrder = async (req: Request, res: Response) => {
  const orderDetails: Order = req.body;
  try {
    const newOrder = new OrderModel(orderDetails);
    await newOrder.save();
    // open new shopping cart after order has been completed
    const newShoppingCart = new ShoppingCartModel({
      customerId: newOrder.customerId,
    });
    await newShoppingCart.save();
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all the overbooked dates(more than 3 orders per date)
export const getOverbookedDates = async (req: Request, res: Response) => {
  try {
    const overbookedDates = await OrderModel.aggregate([
      {
        $group: {
          _id: "$deliveryDate",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gte: 3 },
        },
      },
    ]);
    const dates = overbookedDates.map(item => item._id);
    res.status(200).json(dates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
