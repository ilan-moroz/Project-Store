import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NumberInput from "../NumberInput";
import { addItemToCartApi } from "../../api/cartApi";
import { useDispatch } from "react-redux";
import { CartItem } from "../../models/CartItem";
import { Product } from "../../models/Product";
import { Box } from "@mui/material";
import { useCartState } from "../../hooks/useCartState";
import { addItemToCart, updateCartItem } from "../../redux/cartSlice";
import "./productCard.css";

type cardProps = {
  product: Product;
};

// card template for displaying products
const ProductCard: React.FC<cardProps> = ({ product }) => {
  // Local state for managing quantity of product
  const [quantity, setQuantity] = React.useState(1);

  // get the cartId and cartItems from a custom hook
  const { cartId, cartItems } = useCartState();

  const dispatch = useDispatch();

  // handle add item to cart
  const addToCart = async (cartItem: CartItem) => {
    try {
      // Check if the item already exists in the cart
      const existingItem = cartItems.find(
        item => item.productId === cartItem.productId
      );
      const response = await addItemToCartApi(cartItem.cartId, cartItem);
      // If item exists, dispatch update action, else dispatch add action
      if (existingItem) {
        dispatch(updateCartItem(response));
      } else {
        dispatch(addItemToCart(response));
      }
      setQuantity(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="cardBox">
      <Card
        sx={{
          width: "12rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "17rem",
        }}
        key={product._id}
        className="singleCard"
      >
        <CardMedia
          sx={{ height: 100, backgroundSize: "contain" }}
          image={`http://localhost:4000/${product.imagePath}`}
          title={product.productName}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "1rem" }}
          >
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            &#8362; {product.price.toFixed(2)}
          </Typography>
          <Box sx={{ marginTop: "0.7rem", marginBottom: "-1.5rem" }}>
            <NumberInput onValueChange={setQuantity} quantity={quantity} />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="small"
            sx={{ color: "rgb(70,23,155)" }}
            onClick={() => {
              addToCart({
                productId: product._id!,
                generalPrice: product.price * quantity,
                quantity: quantity,
                cartId: cartId,
              });
            }}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
