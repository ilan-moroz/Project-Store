import express from "express";
import { getAllCategories } from "../controllers/categoryController";

const categoryRouter = express.Router();

// get all categories
categoryRouter.get("/getAllCategories", getAllCategories);

export default categoryRouter;
