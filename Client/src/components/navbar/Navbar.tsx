import { Chip, Menu, MenuItem } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "./navbar.css";
import MoodIcon from "@mui/icons-material/Mood";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { setLogoutAction } from "../../redux/userReducer";
import React from "react";

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for the menu
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
    dispatch(setLogoutAction());
    handleClose();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src={logo} alt="store logo" />
        </Link>
      </div>
      <div className="navbar__contact">
        <p>Phone: 08-6725423</p>
        <p>Email: superstore@gmail.com</p>
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
      </div>
    </div>
  );
};
