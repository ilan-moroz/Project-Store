import { Product, ProductModel } from "../Models/Store";
import { Request, Response } from "express";

// Function to add a new product to the database
export const addProduct = async (req: Request, res: Response) => {
  try {
    // Extract the product details from the request body
    const product: Product = req.body;
    const { productName } = product;
    // The image file path is obtained from the uploaded file
    const imagePath = req.file!.path;

    // Check if the product with the same name already exists
    const existingProduct = await ProductModel.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create a new product model instance and save it in the database
    const newProduct = new ProductModel({ ...product, imagePath });
    await newProduct.save();
    // Respond with a status of 201 (Created) and the new product details
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all products from the database
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).json(allProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Function to edit a product in the database
export const editProduct = async (req: Request, res: Response) => {};

// Function to delete a product from the database
export const deleteProduct = async (req: Request, res: Response) => {};
