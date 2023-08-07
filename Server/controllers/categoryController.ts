import { CategoryModel } from "../Models/Store";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  const allCategories = await CategoryModel.find();
  res.status(200).json(allCategories);
  try {
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
