import React from "react";
import { getCartItems } from "../api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsAction } from "../redux/cartReducer";
import { RootState } from "../redux/Store";
import ItemCart from "./ItemCart/ItemCart";
import { CartItem } from "../models/CartItem";

const Cart = () => {
  const [total, setTotal] = React.useState(0);
  const dispatch = useDispatch();
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.cart?._id) ?? "";

  const getAllCartItems = async (cartId: string) => {
    try {
      const response = await getCartItems(cartId);
      dispatch(setCartItemsAction(response));
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getAllCartItems(cartId);
  }, [cartId]);

  const cartItems = useSelector(
    (state: RootState) => state.shoppingCart.cartItems
  );

  // Calculate total using reduce
  React.useEffect(() => {
    const computedTotal = cartItems.reduce(
      (acc, item) => acc + item.generalPrice,
      0
    );
    setTotal(computedTotal);
  }, [cartItems]);

  return (
    <div style={{ marginTop: "-2rem" }}>
      <h2>Your Cart</h2>
      {cartItems.map((item: CartItem) => (
        <ItemCart item={item} key={item._id} />
      ))}
      <h3>Total: &#8362; {total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
