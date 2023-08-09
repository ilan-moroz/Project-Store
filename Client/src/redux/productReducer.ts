import { Product } from "../models/Product";

export interface ProductState {
  products: Product[];
}

export enum ProductActionType {
  getAllProducts = "getAllProducts",
  addProduct = "addProduct",
  editProduct = "editProduct",
}

export interface ProductAction {
  type: ProductActionType;
  payload?: any;
}

export const getAllProductsAction = (products: Product[]): ProductAction => {
  return { type: ProductActionType.getAllProducts, payload: products };
};

export const addProductAction = (product: Product): ProductAction => {
  return { type: ProductActionType.addProduct, payload: product };
};

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
