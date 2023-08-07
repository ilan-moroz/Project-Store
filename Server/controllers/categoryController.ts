import { CategoryModel } from "../Models/Store";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await CategoryModel.find();
    res.status(200).json(allCategories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
