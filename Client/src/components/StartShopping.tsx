import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartState } from "../hooks/useCartState";

// start shopping comp for display after user login
const StartShopping = () => {
  const cartItems = useCartState();
  console.log(cartItems);

  return (
    <div className="startShopping">
      <Card className="center">
        <CardContent>
          <Typography variant="h5" component="div">
            {cartItems.cartItems.length > 0
              ? "Continue Shopping"
              : " Start Shopping"}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton color="secondary">
            <Link to="/shopping">
              <ShoppingCartIcon />
            </Link>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default StartShopping;
