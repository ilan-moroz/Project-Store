import React from "react";
import ItemCart from "../ItemCart/ItemCart";
import { CartItem } from "../../models/CartItem";
import "./cart.css";
import { Button, LinearProgress } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCartState } from "../../hooks/useCartState";
import { useCartApi } from "../../hooks/useCartApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { setFinishedOrder } from "../../redux/cartSlice";
import { AnimatePresence } from "framer-motion";
import useSearchQuery from "../../hooks/useSearchQuery";

const Cart = () => {
  // Local state for cart total price
  const [totalPrice, setTotalPrice] = React.useState(0);
  // local state for loading
  const [isLoading, setIsLoading] = React.useState(false);

  //custom hook to get cartId, cartItems, and finishedOrder from the Redux store
  const { cartId, cartItems, finishedOrder } = useCartState();

  // custom hook to get functions for interacting with the API
  const { getAllCartItems, handleDeleteCart } = useCartApi(cartId);

  const dispatch = useDispatch();

  // Fetch cart items when the cartId changes
  React.useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      // Promise to fetch the items
      const fetchPromise = getAllCartItems(cartId);
      // Promise to delay for 1 second
      const delayPromise = new Promise(resolve => setTimeout(resolve, 1000));
      // Wait for both promises to complete before setting loading to false
      await Promise.all([fetchPromise, delayPromise]);
      setIsLoading(false);
    };
    fetchItems();
  }, [cartId, getAllCartItems]);

  // Recalculate total price whenever cart items change
  React.useEffect(() => {
    const computedTotal = cartItems.reduce(
      (acc, item) => acc + item.generalPrice,
      0
    );
    setTotalPrice(computedTotal);
  }, [cartItems]);

  // Handler to mark the order as finished
  const handleFinishOrder = () => {
    dispatch(setFinishedOrder());
  };

  // get the search query string from a custom hook
  const searchQuery = useSearchQuery();

  // check if cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="cartItems">
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <div>
            <h2 className="marginLeft">Your Cart</h2>
            {/* show when cart is empty */}
            {isCartEmpty && (
              <div className="cartItems__empty marginLeft">
                Your cart is empty
              </div>
            )}
            {/* map all cart items to display in the cart */}
            <AnimatePresence>
              {cartItems.map((item: CartItem) => (
                <ItemCart
                  item={item}
                  key={item._id}
                  searchQuery={searchQuery}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="cartItems__total marginLeft">
            <h3>Total: &#8362; {totalPrice.toFixed(2)}</h3>
            {!isCartEmpty && (
              <Button
                variant="contained"
                endIcon={<ShoppingCartIcon />}
                size="small"
                sx={{
                  backgroundColor: "rgb(103, 32, 180)",
                  "&:hover": {
                    backgroundColor: "rgb(130, 93, 242)",
                  },
                  marginRight: "0.3rem",
                }}
                onClick={handleFinishOrder}
              >
                {!finishedOrder ? "Order" : "Back To Shopping"}
              </Button>
            )}
            {/* show only where there is items in the cart */}
            {!isCartEmpty && !finishedOrder && (
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
        </>
      )}
    </div>
  );
};

export default Cart;
