import { Product } from "../models/Product";

// Initial state
export interface ProductState {
  products: Product[];
}

// all possible action types
export enum ProductActionType {
  getAllProducts = "getAllProducts",
  addProduct = "addProduct",
  editProduct = "editProduct",
}

// Defining the action structure
export interface ProductAction {
  type: ProductActionType;
  payload?: any;
}

// Functions to dispatch actions
export const getAllProductsAction = (products: Product[]): ProductAction => {
  return { type: ProductActionType.getAllProducts, payload: products };
};

export const addProductAction = (product: Product): ProductAction => {
  return { type: ProductActionType.addProduct, payload: product };
};

// Reducer function to handle state changes based on actions
export const productReducer = (
  currentState: ProductState = {
    products: [],
  },
  action: ProductAction
): ProductState => {
  const newState = { ...currentState };

  switch (action.type) {
    case ProductActionType.getAllProducts:
      newState.products = action.payload;
      break;

    case ProductActionType.addProduct:
      newState.products = [...newState.products, action.payload];
      break;

    case ProductActionType.editProduct:
      newState.products = newState.products.filter(
        product => product._id !== action.payload
      );
      break;
  }

  return newState;
};
