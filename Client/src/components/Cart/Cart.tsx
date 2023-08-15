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
  // Local state for cart total
  const [total, setTotal] = React.useState(0);
  // Get Redux dispatch function
  const dispatch = useDispatch();

  // Get cartId from the Redux store
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.cart?._id) ?? "";

  // Function to fetch all items in the cart from the API
  const getAllCartItems = async (cartId: string) => {
    try {
      const response = await getCartItems(cartId);
      dispatch(setCartItemsAction(response));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch cart items when the cartId changes
  React.useEffect(() => {
    getAllCartItems(cartId);
  }, [cartId]);

  // Get cartItems from the Redux store
  const cartItems = useSelector(
    (state: RootState) => state.shoppingCart.cartItems
  );

  // Recalculate total whenever cart items change
  React.useEffect(() => {
    const computedTotal = cartItems.reduce(
      (acc, item) => acc + item.generalPrice,
      0
    );
    setTotal(computedTotal);
  }, [cartItems]);

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
        {cartItems.length !== 0 && (
          <Button
            endIcon={<DeleteForeverIcon />}
            size="small"
            color="error"
            onClick={handleDeleteCart}
          >
            Clear Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
