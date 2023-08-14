import { CartItem } from "../models/CartItem";
import { ShoppingCart } from "../models/ShoppingCart";

export interface CartState {
  cart: ShoppingCart | null;
  cartItems: CartItem[];
}

export enum CartActionType {
  setCart = "setCart",
  removeCart = "removeCart",
  setCartItems = "setCartItems",
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

export const setCartItemsAction = (cartItems: CartItem[]): CartAction => {
  return { type: CartActionType.setCartItems, payload: cartItems };
};

export const cartReducer = (
  currentState: CartState = {
    cart: null,
    cartItems: [],
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

    case CartActionType.setCartItems:
      newState.cartItems = action.payload;
      break;

    default:
      return currentState;
  }

  return newState;
};
