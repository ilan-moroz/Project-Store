import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../models/CartItem";
import { RootState } from "../../redux/Store";
import "./itemCart.css";
import NumberInput from "../NumberInput";
import React from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCartItem, updateCartItem } from "../../api/cartApi";
import {
  deleteItemFromCartAction,
  updateCartItemAction,
} from "../../redux/cartReducer";
import EditIcon from "@mui/icons-material/Edit";

type cardProps = {
  item: CartItem;
};

const ItemCart: React.FC<cardProps> = ({ item }) => {
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(product => product._id === item.productId);

  const [quantity, setQuantity] = React.useState(item.quantity);
  const [showButton, setShowButton] = React.useState(false);

  const handleQuantityChange = (newValue: number) => {
    if (newValue !== item.quantity) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDelete = async () => {
    try {
      const response = await deleteCartItem(item.cartId, item.productId);
      if (response)
        dispatch(deleteItemFromCartAction(response.cartId, response.productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItem = async (item: CartItem) => {
    try {
      const response = await updateCartItem({
        ...item,
        quantity: quantity,
        generalPrice: quantity * product!.price,
      });
      if (response) dispatch(updateCartItemAction(response));
      setShowButton(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cartItem">
      <div className="cartItem__imageName">
        <h3>{product?.productName}</h3>
        <div className="cartItem__delete">
          <IconButton aria-label="delete" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
        <img
          src={`http://localhost:4000/${product?.imagePath}`}
          alt={product?.productName}
          className="cartItem__image"
        />
      </div>
      {showButton && (
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
            onClick={() => handleUpdateItem(item)}
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
