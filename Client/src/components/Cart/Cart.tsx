import React from "react";
import ItemCart from "../ItemCart/ItemCart";
import { CartItem } from "../../models/CartItem";
import "./cart.css";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCartState } from "../../hooks/useCartState";
import { useCartAPI } from "../../hooks/useCartApi";

const Cart = () => {
  // Local state for cart total
  const [total, setTotal] = React.useState(0);

  // Utilize the custom hook to get cartId and cartItems from the Redux store
  const { cartId, cartItems } = useCartState();

  // Utilize the custom hook to get functions for interacting with the API
  const { getAllCartItems, handleDeleteCart } = useCartAPI(cartId);

  // Fetch cart items when the cartId changes
  React.useEffect(() => {
    console.log("fetching cart items");
    getAllCartItems(cartId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  // Recalculate total whenever cart items change
  React.useEffect(() => {
    const computedTotal = cartItems.reduce(
      (acc, item) => acc + item.generalPrice,
      0
    );
    setTotal(computedTotal);
  }, [cartItems]);

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
