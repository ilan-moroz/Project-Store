import { useProduct } from "../../hooks/useProducts";
import { Product } from "../../models/Product";
import CardComp from "../ProductCard";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import "./products.css";
import { useProductState } from "../../hooks/useProductState";
import { useDispatch } from "react-redux";
import { useCategoryState } from "../../hooks/useCategoryState";
import {
  resetSelectedCategoryAction,
  setSelectedCategoryAction,
} from "../../redux/categoryReducer";

const Products = () => {
  // get all products from backend using custom hook
  useProduct();
  // custom hooks to get searchProducts and selectedCategory from the Redux store
  const { searchProducts } = useProductState();
  const { selectedCategory } = useCategoryState();

  const dispatch = useDispatch();

  // Handler to toggle category selection for product filtering
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      dispatch(resetSelectedCategoryAction());
    } else {
      dispatch(setSelectedCategoryAction(categoryId));
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
