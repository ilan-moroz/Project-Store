import React from "react";
import { getAllCategories } from "../api/categoryApi";

// hook to get all categories from database
export const useCategory = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return categories;
};
