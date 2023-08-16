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

export default function SearchInput() {
  // State to manage the search string entered by the user
  const [searchString, setSearchString] = React.useState("");

  const dispatch = useDispatch();

  // Function to handle the search functionality
  const handleSearch = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }
    try {
      // Call the API to get the products based on the search string
      const response = await searchProducts(searchString);
      if (response) {
        dispatch(searchProductsAction(response));
        dispatch(resetSelectedCategoryAction());
      }
    } catch (err: any) {
      toast.warning(err.response.data.message);
      console.error(err);
    }
  };

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
