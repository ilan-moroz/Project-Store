import React from "react";
import { deleteAllCartItems, getCartItems } from "../../api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllCartItemsAction,
  setCartItemsAction,
} from "../../redux/cartReducer";
import { RootState } from "../../redux/Store";
import ItemCart from "../ItemCart/ItemCart";
import { CartItem } from "../../models/CartItem";
import "./cart.css";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

  const handleDeleteCart = async () => {
    try {
      const response = await deleteAllCartItems(cartId);
      dispatch(deleteAllCartItemsAction());
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cartItems">
      <div>
        <h2 className="marginLeft">Your Cart</h2>
        {cartItems.length === 0 && (
          <div className="cartItems__empty marginLeft">Your cart is empty</div>
        )}
        {cartItems.map((item: CartItem) => (
          <ItemCart item={item} key={item._id} />
        ))}
      </div>
      <div className="cartItems__total marginLeft">
        <h3>Total: &#8362; {total.toFixed(2)}</h3>
        <Button
          endIcon={<DeleteForeverIcon />}
          size="small"
          color="error"
          onClick={handleDeleteCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
