import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartItemApi } from "../api/cartApi";

import { CartItem } from "../models/CartItem";
import { deleteItemFromCart, updateCartItem } from "../redux/cartSlice";

export const useCartItemApi = () => {
  const dispatch = useDispatch();

  const handleDeleteCartItem = async (cartId: string, productId: string) => {
    try {
      const response = await deleteCartItem(cartId, productId);
      if (response)
        dispatch(
          deleteItemFromCart({
            cartId: response.cartId,
            productId: response.productId,
          })
        );
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
      const response = await updateCartItemApi({
        ...item,
        quantity,
        generalPrice: quantity * price,
      });
      if (response) dispatch(updateCartItem(response));
    } catch (err) {
      console.error(err);
    }
  };

  return { handleDeleteCartItem, handleUpdateItem };
};
