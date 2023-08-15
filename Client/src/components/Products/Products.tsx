import { useSelector } from "react-redux";
import { useProduct } from "../../hooks/useProducts";
import { Product } from "../../models/Product";
import CardComp from "../ProductCard";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import "./products.css";
import { RootState } from "../../redux/Store";
import React from "react";

const Products = () => {
  // get all products from backend using custom hook
  useProduct();
  // display all products from the state
  const products = useSelector((state: RootState) => state.products.products);

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  return (
    <div>
      <div className="productsNavbar">
        <CategoryNavbar onSelectCategory={handleCategorySelect} />
      </div>
      <div className="productCards">
        {/* map all the products and display in card */}
        {filteredProducts.map((product: Product) => (
          <CardComp product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
