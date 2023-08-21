import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useCartState = () => {
  const { cartId, cartItems, finishedOrder } = useSelector(
    (state: RootState) => ({
      cartId: state.shoppingCart.cart?._id ?? "",
      cartItems: state.shoppingCart.cartItems,
      finishedOrder: state.shoppingCart.finishedOrder,
    })
  );

  return { cartId, cartItems, finishedOrder };
};
