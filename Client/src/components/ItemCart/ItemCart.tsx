import { useSelector } from "react-redux";
import { CartItem } from "../../models/CartItem";
import { RootState } from "../../redux/Store";
import "./itemCart.css";
import NumberInput from "../NumberInput";
import React from "react";

type cardProps = {
  item: CartItem;
};

const ItemCart: React.FC<cardProps> = ({ item }) => {
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(product => product._id === item.productId);

  const [quantity, setQuantity] = React.useState(item.quantity);

  return (
    <div className="cartItem">
      <div className="cartItem__imageName">
        <h3>{product?.productName}</h3>
        <img
          src={`http://localhost:4000/${product?.imagePath}`}
          alt={product?.productName}
          className="cartItem__image"
        />
      </div>
      <div className="cartITem__price">
        <p> Price: &#8362; {product?.price} </p>
        <NumberInput onValueChange={setQuantity} quantity={quantity} />
        <p> Total Price: &#8362; {item.generalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ItemCart;
