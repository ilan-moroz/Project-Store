import { ProductModel } from "../Models/Store";
import { Request, Response } from "express";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { productName } = product;
    const imagePath = req.file!.path;

    const existingProduct = await ProductModel.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new ProductModel({ ...product, imagePath });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).json(allProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req: Request, res: Response) => {};

export const deleteProduct = async (req: Request, res: Response) => {};
