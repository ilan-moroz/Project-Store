import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const StartShopping = () => {
  return (
    <div className="startShopping">
      <Card className="center">
        <CardContent>
          <Typography variant="h5" component="div">
            Start Shopping / Continue Shopping
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton color="secondary" aria-label="add an alarm">
            <ShoppingCartIcon />
          </IconButton>{" "}
        </CardActions>
      </Card>
    </div>
  );
};
