import React from "react";
import { getAllCategories } from "../api/categoryApi";

export const useCategory = () => {
  const [catagories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
        console.log(response);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return catagories;
};
