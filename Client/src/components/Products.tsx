import { useProduct } from "../hooks/useProducts";
import CategoryNavbar from "./CategoryNavbar/CategoryNavbar";

const Products = () => {
  const products = useProduct();
  return (
    <div className="shopping__main">
      <CategoryNavbar />
    </div>
  );
};
export default Products;
