import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { searchProducts } from "../api/productApi";
import React from "react";
import { useDispatch } from "react-redux";
import { searchProductsAction } from "../redux/productReducer";
import { toast } from "react-toastify";
import { resetSelectedCategoryAction } from "../redux/categoryReducer";
import { useCategoryState } from "../hooks/useCategoryState";
import { useProductState } from "../hooks/useProductState";

export default function SearchInput() {
  // State to manage the search string entered by the user
  const [searchString, setSearchString] = React.useState("");
  // Fetch the currently selected category and products list using custom hooks
  const { selectedCategory } = useCategoryState();
  const { products } = useProductState();

  // Use a ref to track if we've dispatched products on category change
  const hasDispatchedOnceRef = React.useRef(false);

  const dispatch = useDispatch();

  // Function to handle the search functionality
  const handleSearch = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }
    try {
      // Fetch products based on the user's search string
      const response = await searchProducts(searchString);
      if (response) {
        // Dispatch the found products to the Redux store
        dispatch(searchProductsAction(response));
        // Reset the selected category in the store
        dispatch(resetSelectedCategoryAction());
      }
      // Reset the ref after a search, allowing the category effect to run again if needed
      hasDispatchedOnceRef.current = false;
    } catch (err: any) {
      toast.warning(err.response.data.message);
      console.error(err);
    }
  };

  // Effect hook to handle product dispatch when a category is selected
  React.useEffect(() => {
    if (selectedCategory && !hasDispatchedOnceRef.current) {
      // When a category is selected for the first time, dispatch its products and clear the search input
      dispatch(searchProductsAction(products));
      setSearchString("");
      console.log("asd");
      // Update the ref to indicate that we've dispatched once
      hasDispatchedOnceRef.current = true;
    }
  }, [selectedCategory, dispatch, products]);

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        border: "solid 1px rgb(103, 32, 180)",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ "aria-label": "Search Products" }}
        onChange={e => setSearchString(e.target.value)}
        value={searchString}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", color: "rgb(103, 32, 180)" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
