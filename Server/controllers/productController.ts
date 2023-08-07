import { Product, ProductModel } from "../Models/Store";
import { Request, Response } from "express";

export const addProduct = async (req: Request, res: Response) => {
  const product: Product = req.body;
  try {
    // check if product already exists
    const { productName } = product;
    const existProductName = await ProductModel.findOne({ productName });
    if (existProductName) {
      return res.status(400).json({
        message: "Product with this name already exists",
      });
    }
    // save the new product
    const newProduct = new ProductModel(product);
    newProduct.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req: Request, res: Response) => {};

export const deleteProduct = async (req: Request, res: Response) => {};
