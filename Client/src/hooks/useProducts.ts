import React from "react";
import { getProducts } from "../api/productApi";
import { useDispatch } from "react-redux";
import { getAllProductsAction } from "../redux/productReducer";

// hook to get all products from database
export const useProduct = () => {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        // dispatch the response to redux
        dispatch(getAllProductsAction(response));
        setProducts(response);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return products;
};
