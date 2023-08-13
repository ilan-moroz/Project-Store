import Cart from "../../components/Cart";
import Products from "../../components/Products/Products";
import "./shopping.css";
import { Resizable } from "re-resizable";

const Shopping = () => {
  return (
    <div className="shopping">
      {/* resizable comp */}
      <Resizable
        defaultSize={{
          width: 450,
          height: "100%",
        }}
        minWidth={125}
      >
        <Cart />
      </Resizable>
      <Products />
    </div>
  );
};

export default Shopping;
