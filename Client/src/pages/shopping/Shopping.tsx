import Cart from "../../components/Cart/Cart";
import Products from "../../components/Products/Products";
import "./shopping.css";
import AddProduct from "../../components/AddProduct";
import { useUserState } from "../../hooks/useUserState";
import { useCartState } from "../../hooks/useCartState";
import OrderForm from "../../components/OrderForm/OrderForm";

const Shopping = () => {
  const { user } = useUserState();
  const { finishedOrder } = useCartState();

  return (
    <div className="shopping">
      <div className="cartOrAddProduct">
        {/* if admin show add product comp if user show cart comp */}
        {user?.role === "admin" ? <AddProduct /> : <Cart />}
      </div>
      <div className="shopping__main">
        {!finishedOrder ? <Products /> : <OrderForm />}
      </div>
    </div>
  );
};

export default Shopping;
