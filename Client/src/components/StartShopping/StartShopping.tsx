import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartState } from "../../hooks/useCartState";
import "./startShopping.css";
import useTotalCartPrice from "../../hooks/useTotalCartPrice";
import { rearrangeDate } from "../../utils/rearrangeDate";
import React from "react";
import { getLastOrder } from "../../api/orderApi";
import { useUserState } from "../../hooks/useUserState";

const StartShopping = () => {
  const { cartItems, cart } = useCartState();
  const { user } = useUserState();

  const totalPrice = useTotalCartPrice(cartItems);

  const hasItemsInCart = cartItems.length > 0;

  const cartCreatedAt = hasItemsInCart ? rearrangeDate(cart!.createdAt) : null;

  const [lastOrder, setLastOrder] = React.useState("");

  React.useEffect(() => {
    const userLastOrder = async () => {
      if (cart && cart.customerId) {
        const response = await getLastOrder(cart.customerId);
        setLastOrder(response.orderExecutionDate);
      }
    };
    userLastOrder();
  }, [cart]);

  return (
    <div className="startShopping-container">
      <Card className="startShopping-card">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className="startShopping-text"
          >
            Welcome{user && user.firstName ? `, ${user.firstName}` : ""}!
            <Box>{hasItemsInCart ? "Continue" : "Start"} shopping now.</Box>
          </Typography>
          {hasItemsInCart ? (
            <Box sx={{ mt: 2 }}>
              <Box>Shopping cart created on: {cartCreatedAt}</Box>
              <Box>Total cart value: &#8362;{totalPrice}</Box>
            </Box>
          ) : lastOrder ? (
            <Box sx={{ mt: 2 }}>
              Your most recent order was placed on: {rearrangeDate(lastOrder)}
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              Welcome to our store!
              <Box>Begin your premium shopping experience now.</Box>
            </Box>
          )}
        </CardContent>
        <CardActions className="startShopping-actions">
          <IconButton color="secondary">
            <Badge badgeContent={cartItems.length} color="error">
              <Link to="/shopping" className="startShopping-link">
                <ShoppingCartIcon fontSize="large" />
              </Link>
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default StartShopping;
