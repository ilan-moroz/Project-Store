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
  addItemToCart = "addItemToCart",
  updateCartItem = "updateCartItem",
  deleteItemFromCart = "deleteItemFromCart",
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

export const addItemToCartAction = (cartItem: CartItem): CartAction => {
  return { type: CartActionType.addItemToCart, payload: cartItem };
};

export const updateCartItemAction = (cartItem: CartItem): CartAction => {
  return { type: CartActionType.updateCartItem, payload: cartItem };
};

export const deleteItemFromCartAction = (
  cartId: string,
  productId: string
): CartAction => {
  return {
    type: CartActionType.deleteItemFromCart,
    payload: { cartId, productId },
  };
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

    case CartActionType.addItemToCart:
      newState.cartItems = [...newState.cartItems, action.payload];
      break;

    case CartActionType.updateCartItem:
      newState.cartItems = newState.cartItems.map(cartItem =>
        cartItem._id === action.payload._id ? action.payload : cartItem
      );
      break;

    case CartActionType.deleteItemFromCart:
      newState.cartItems = newState.cartItems.filter(
        (cartItem: CartItem) =>
          cartItem.cartId !== action.payload.cartId ||
          cartItem.productId !== action.payload.productId
      );
      break;

    default:
      return currentState;
  }

  return newState;
};
