import { Product } from "../../models/Product";
import CardComp from "../ProductCard/ProductCard";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import "./products.css";
import { useProductState } from "../../hooks/useProductState";
import { useDispatch } from "react-redux";
import { useCategoryState } from "../../hooks/useCategoryState";
import {
  resetSelectedCategory,
  setSelectedCategory,
} from "../../redux/categorySlice";
import { motion } from "framer-motion";

const Products = () => {
  // custom hooks to get searchProducts and selectedCategory from the Redux store
  const { searchProducts } = useProductState();
  const { selectedCategory } = useCategoryState();

  const dispatch = useDispatch();

  // Handler to toggle category selection for product filtering
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      dispatch(resetSelectedCategory());
    } else {
      dispatch(setSelectedCategory(categoryId));
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
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: "20rem" }}
        transition={{
          y: { duration: 1, ease: "easeOut" },
        }}
      >
        <div className="productCards">
          {/* map all the products and display in card */}
          {filteredProducts.map((product: Product) => (
            <CardComp product={product} key={product._id} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Products;
