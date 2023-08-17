import { CartItem } from "../../models/CartItem";
import "./itemCart.css";
import NumberInput from "../NumberInput";
import React from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useProductState } from "../../hooks/useProductState";
import { useCartItemApi } from "../../hooks/useCartItemApi";
import { useCartState } from "../../hooks/useCartState";

type cardProps = {
  item: CartItem;
};

const ItemCart: React.FC<cardProps> = ({ item }) => {
  // custom hook to get products from the Redux store
  const { products } = useProductState();
  // custom hook to get finishedOrder state from the Redux store
  const { finishedOrder } = useCartState();

  // Find the product associated with this cart item
  const product = products.find(product => product._id === item.productId);

  // get the functions from custom hook
  const { handleDeleteCartItem, handleUpdateItem } = useCartItemApi();

  // Local state to track quantity and whether to show the update button
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [showButton, setShowButton] = React.useState(false);

  // Toggle the visibility of the update button based on quantity change
  const handleQuantityChange = (newValue: number) => {
    setShowButton(newValue !== item.quantity);
  };

  React.useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="cartItem">
      <div className="cartItem__imageName">
        <h3>{product?.productName}</h3>
        {!finishedOrder && (
          <div className="cartItem__delete">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDeleteCartItem(item.cartId, item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        <img
          src={`http://localhost:4000/${product?.imagePath}`}
          alt={product?.productName}
          className="cartItem__image"
        />
      </div>
      {showButton && !finishedOrder && (
        <div className="updateButton">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            size="small"
            color="success"
            sx={{
              padding: "2px 5px",
              fontSize: "0.7rem",
            }}
            onClick={() => {
              handleUpdateItem(item, quantity, product!.price);
              setShowButton(false);
            }}
          >
            Update
          </Button>
        </div>
      )}
      <div className="cartItem__price">
        <p> Price: &#8362; {product?.price} </p>
        <div className="numberInputWrapper">
          <NumberInput
            onValueChange={setQuantity}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
        </div>
        <p> Total Price: &#8362; {item.generalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ItemCart;
