import React from "react";
import ItemCart from "../ItemCart/ItemCart";
import { CartItem } from "../../models/CartItem";
import "./cart.css";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCartState } from "../../hooks/useCartState";
import { useCartApi } from "../../hooks/useCartApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { setFinishedOrder } from "../../redux/cartSlice";

const Cart = () => {
  // Local state for cart total
  const [total, setTotal] = React.useState(0);

  // custom hook to get cartId and cartItems from the Redux store
  const { cartId, cartItems, finishedOrder } = useCartState();

  // custom hook to get functions for interacting with the API
  const { getAllCartItems, handleDeleteCart } = useCartApi(cartId);

  const dispatch = useDispatch();

  // Fetch cart items when the cartId changes
  React.useEffect(() => {
    getAllCartItems(cartId);
  }, [cartId, getAllCartItems]);

  // Recalculate total whenever cart items change
  React.useEffect(() => {
    const computedTotal = cartItems.reduce(
      (acc, item) => acc + item.generalPrice,
      0
    );
    setTotal(computedTotal);
  }, [cartItems]);

  const handleFinishOrder = () => {
    dispatch(setFinishedOrder());
  };

  return (
    <div className="cartItems">
      <div>
        <h2 className="marginLeft">Your Cart</h2>
        {/* show when cart is empty */}
        {cartItems.length === 0 && (
          <div className="cartItems__empty marginLeft">Your cart is empty</div>
        )}
        {/* map all cart items to display in the cart */}
        {cartItems.map((item: CartItem) => (
          <ItemCart item={item} key={item._id} />
        ))}
      </div>
      <div className="cartItems__total marginLeft">
        <h3>Total: &#8362; {total.toFixed(2)}</h3>
        <Button
          variant="contained"
          endIcon={<ShoppingCartIcon />}
          size="small"
          sx={{
            backgroundColor: "rgb(103, 32, 180)",
            "&:hover": {
              backgroundColor: "rgb(130, 93, 242)",
            },
          }}
          onClick={handleFinishOrder}
        >
          Order
        </Button>
        {/* show only where there is items in the cart */}
        {cartItems.length !== 0 && !finishedOrder && (
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
