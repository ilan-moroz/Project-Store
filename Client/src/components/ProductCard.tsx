import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NumberInput from "./NumberInput";
import { addItemToCart } from "../api/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { Box } from "@mui/material";

type cardProps = {
  product: Product;
};

// card template for displaying products
const ProductCard: React.FC<cardProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);

  const cart = useSelector((state: RootState) => state.shoppingCart.cart);
  const cartId = cart?._id || "";

  // handle add item to cart
  const addToCart = async (cartItem: CartItem) => {
    try {
      const response = await addItemToCart(cartItem.cartId, cartItem);
      setQuantity(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ width: "12rem", textAlign: "center" }} key={product._id}>
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
  );
};

export default ProductCard;
