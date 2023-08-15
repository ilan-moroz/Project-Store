import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartItem } from "../api/cartApi";
import {
  deleteItemFromCartAction,
  updateCartItemAction,
} from "../redux/cartReducer";
import { CartItem } from "../models/CartItem";

export const useCartItemApi = () => {
  const dispatch = useDispatch();

  const handleDeleteCartItem = async (cartId: string, productId: string) => {
    try {
      const response = await deleteCartItem(cartId, productId);
      if (response)
        dispatch(deleteItemFromCartAction(response.cartId, response.productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItem = async (
    item: CartItem,
    quantity: number,
    price: number
  ) => {
    try {
      const response = await updateCartItem({
        ...item,
        quantity,
        generalPrice: quantity * price,
      });
      if (response) dispatch(updateCartItemAction(response));
    } catch (err) {
      console.error(err);
    }
  };

  return { handleDeleteCartItem, handleUpdateItem };
};
