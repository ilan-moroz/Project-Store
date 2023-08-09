import { useProduct } from "../hooks/useProducts";
import { Product } from "../models/Product";
import CardComp from "./Card";
import CategoryNavbar from "./CategoryNavbar/CategoryNavbar";

const Products = () => {
  const products = useProduct();

  return (
    <div className="shopping__main">
      <CategoryNavbar />
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
  );
};

export default Products;
