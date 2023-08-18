import { Box, Chip, Menu, MenuItem } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "./navbar.css";
import MoodIcon from "@mui/icons-material/Mood";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/userSlice";
import React from "react";
import SearchInput from "../SearchInput";
import { useUserState } from "../../hooks/useUserState";
import { removeCart } from "../../redux/cartSlice";
import { useCartState } from "../../hooks/useCartState";

const Navbar = () => {
  // custom hook to get user and finishOrder state from the Redux store
  const { user } = useUserState();
  const { finishedOrder } = useCartState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for the popup menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout user
  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(removeCart());
    handleClose();
    navigate("/");
  };

  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src={logo} alt="store logo" />
        </Link>
      </div>
      {/* show the search only in shopping page */}
      {location.pathname === "/shopping" && !finishedOrder && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchInput />
        </Box>
      )}
      <div className="navbar__contact">
        <p>Phone: 08-6725423</p>
        <p>Email: superstore@gmail.com</p>
        <div className="navbar__username">
          <Chip
            icon={<MoodIcon style={{ color: "rgb(103,32,180)" }} />}
            label={user ? `${user.firstName} ${user.lastName}` : "Hello Guest"}
            variant="outlined"
            sx={{
              color: "rgb(103,32,180)",
              width: "10rem",
              fontSize: "1.1rem",
              margin: "1rem 0 0 2rem",
            }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          {user && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
