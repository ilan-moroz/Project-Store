import { Chip } from "@mui/material";
import logo from "../assets/images/logo.png";
import "../styles/navbar.css";
import MoodIcon from "@mui/icons-material/Mood";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="store logo" />
      </div>
      <div className="navbar__contact">
        <p className="navbar_contact--phone">Phone: 08-6725423</p>
        <p className="navbar_contact--email">Email: superstore@gmail.com</p>
        <Chip
          icon={<MoodIcon style={{ color: "rgb(103, 79, 167)" }} />}
          label="Hello Guest !"
          variant="outlined"
          sx={{
            color: "rgb(103, 79, 167)",
            width: "10rem",
            fontSize: "1.1rem",
            margin: "1rem 0 0 2rem",
          }}
        />
      </div>
    </div>
  );
};
