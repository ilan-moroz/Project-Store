import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useProductState = () => {
  // Get all products from the Redux store
  const { products, searchProducts } = useSelector((state: RootState) => ({
    products: state.products.products,
    searchProducts: state.products.searchProducts,
  }));

  return { products, searchProducts };
};
