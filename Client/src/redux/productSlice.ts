import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";

// Initial state
interface ProductState {
  products: Product[];
  searchProducts: Product[];
  editProductId: string | null;
}

const initialState: ProductState = {
  products: [],
  searchProducts: [],
  editProductId: null,
};

// create a slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Handle the action to get all products
    getAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.searchProducts = action.payload;
    },
    // Handle the action to add a product
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    // Handle the action to search for products
    searchProducts: (state, action: PayloadAction<Product[]>) => {
      state.searchProducts = action.payload;
    },
    // Handle the action to edit product
    editProductId: (state, action: PayloadAction<string | null>) => {
      state.editProductId = action.payload;
    },
  },
});

export const { getAllProducts, addProduct, searchProducts } =
  productSlice.actions;

export default productSlice.reducer;
