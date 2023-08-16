import { useProduct } from "../../hooks/useProducts";
import { Product } from "../../models/Product";
import CardComp from "../ProductCard";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import "./products.css";
import React from "react";
import { useProductState } from "../../hooks/useProductState";

const Products = () => {
  // get all products from backend using custom hook
  useProduct();
  // custom hook to get products from the Redux store
  const { searchProducts } = useProductState();

  // Local state to track the currently selected category for filtering
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  // Handler to toggle category selection for product filtering
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  // Filter products based on the selected category, or display all if no category is selected
  const filteredProducts = selectedCategory
    ? searchProducts.filter(product => product.categoryId === selectedCategory)
    : searchProducts;

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
