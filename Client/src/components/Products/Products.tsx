import { useSelector } from "react-redux";
import { useProduct } from "../../hooks/useProducts";
import { Product } from "../../models/Product";
import CardComp from "../Card";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import "./products.css";
import { RootState } from "../../redux/Store";

const Products = () => {
  useProduct();
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="shopping__main">
      <CategoryNavbar />
      <div className="productCards">
        {products.map((product: Product) => (
          <CardComp
            name={product.productName}
            price={product.price}
            imagePath={product.imagePath}
            id={product._id!}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
