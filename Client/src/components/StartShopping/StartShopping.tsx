import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCartState } from "../../hooks/useCartState";
import "./startShopping.css";

const StartShopping = () => {
  const { cartItems } = useCartState();

  const hasItemsInCart = cartItems.length > 0;

  return (
    <div className="startShopping-container">
      <Card className="startShopping-card">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className="startShopping-text"
          >
            Welcome back! {hasItemsInCart ? "Continue" : "Start"} shopping now.
          </Typography>
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
