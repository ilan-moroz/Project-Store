import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { searchProducts } from "../api/productApi";

export default function SearchInput() {
  // handle the search product
  const handleSearch = async (searchInput: string) => {
    try {
      const response = await searchProducts(searchInput);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper
      component="form"
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
        onChange={e => handleSearch(e.target.value)}
      />
      <IconButton
        type="button"
        sx={{ p: "10px", color: "rgb(103, 32, 180)" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
