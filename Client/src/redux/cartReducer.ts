import { ShoppingCart } from "../models/ShoppingCart";

export interface CartState {
  cart: ShoppingCart | null;
}

export enum CartActionType {
  setCart = "setCart",
  removeCart = "removeCart",
}

export interface CartAction {
  type: CartActionType;
  payload?: any;
}

export const setCartAction = (cart: ShoppingCart): CartAction => {
  return { type: CartActionType.setCart, payload: cart };
};

export const removeCartAction = (): CartAction => {
  return { type: CartActionType.removeCart };
};

export const cartReducer = (
  currentState: CartState = {
    cart: null,
  },
  action: CartAction
): CartState => {
  const newState = { ...currentState };

  switch (action.type) {
    case CartActionType.setCart:
      newState.cart = action.payload;
      break;

    case CartActionType.removeCart:
      newState.cart = null;
      break;

    default:
      return currentState;
  }

  return newState;
};
