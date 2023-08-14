import { useSelector } from "react-redux";
import { useProduct } from "../../hooks/useProducts";
import { Product } from "../../models/Product";
import CardComp from "../ProductCard";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import "./products.css";
import { RootState } from "../../redux/Store";

const Products = () => {
  // get all products from backend using custom hook
  useProduct();
  // display all products from the state
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div>
      <CategoryNavbar />
      <div className="productCards">
        {/* map all the products and display in card */}
        {products.map((product: Product) => (
          <CardComp product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
