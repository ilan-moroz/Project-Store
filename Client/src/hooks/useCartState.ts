import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useCartState = () => {
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.cart?._id) ?? "";
  const cartItems = useSelector(
    (state: RootState) => state.shoppingCart.cartItems
  );

  return { cartId, cartItems };
};
