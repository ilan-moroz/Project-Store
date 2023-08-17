import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useCartState = () => {
  // Get cartId from the Redux store
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.cart?._id) ?? "";

  // Get cartItems from the Redux store
  const cartItems = useSelector(
    (state: RootState) => state.shoppingCart.cartItems
  );

  // Get cartItems from the Redux store
  const finishedOrder = useSelector(
    (state: RootState) => state.shoppingCart.finishedOrder
  );

  return { cartId, cartItems, finishedOrder };
};
