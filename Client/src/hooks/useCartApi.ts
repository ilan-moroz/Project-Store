import { useDispatch } from "react-redux";
import { deleteAllCartItems, getCartItems } from "../api/cartApi";
import {
  deleteAllCartItemsAction,
  setCartItemsAction,
} from "../redux/cartReducer";
import { useCallback } from "react";

export const useCartAPI = (cartId: string) => {
  const dispatch = useDispatch();

  // Function to fetch all items in the cart from the API
  const getAllCartItems = useCallback(
    async (id: string) => {
      try {
        const response = await getCartItems(id);
        dispatch(setCartItemsAction(response));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  // Function to handle deleting all items from the cart
  const handleDeleteCart = async () => {
    try {
      const response = await deleteAllCartItems(cartId);
      if (response) dispatch(deleteAllCartItemsAction());
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return { getAllCartItems, handleDeleteCart };
};
