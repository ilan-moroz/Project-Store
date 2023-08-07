import Cart from "../../components/Cart";
import Products from "../../components/Products";
import "./shopping.css";
import { Resizable } from "re-resizable";

const Shopping = () => {
  return (
    <div className="shopping">
      <Resizable
        defaultSize={{
          width: 450,
          height: "100%",
        }}
      >
        <Cart />
      </Resizable>
      <Products />
    </div>
  );
};

export default Shopping;
