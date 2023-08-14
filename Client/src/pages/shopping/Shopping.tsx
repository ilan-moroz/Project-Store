import { useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import Products from "../../components/Products/Products";
import "./shopping.css";
import { Resizable } from "re-resizable";
import { RootState } from "../../redux/Store";
import AddProduct from "../../components/AddProduct";

const Shopping = () => {
  const user = useSelector((state: RootState) => state.user.user);

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
        <div className="cartOrAddProduct">
          {/* if admin show add product comp if user show cart comp */}
          {user?.role === "admin" ? <AddProduct /> : <Cart />}
        </div>
      </Resizable>
      <div className="shopping__main">
        <Products />
      </div>
    </div>
  );
};

export default Shopping;
