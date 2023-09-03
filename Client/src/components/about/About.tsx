import { Typography } from "@mui/material";
import storeImage from "../../assets/images/store.png";
import "./about.css";
import useResponsive from "../../hooks/useResponsive";

const About = () => {
  // check the screen size
  const { isXsScreen } = useResponsive();

  return (
    <div className="about ">
      <Typography
        variant="h3"
        gutterBottom
        className="purpleText"
        sx={{
          whiteSpace: "nowrap",
          marginTop: "1rem",
          fontFamily: "Josefin Sans",
          fontWeight: 500,
          fontSize: isXsScreen ? "1.9rem" : "3.5rem",
        }}
      >
        Welcome to SuperStore!
      </Typography>
      <img src={storeImage} alt="store" className="storeImage" />
      <p>
        In a marketplace crowded with options, our store stands apart as a
        beacon of quality and customer service. When you choose to shop with us,
        you're not just making a purchase; you're making an investment in
        reliable, high-quality products curated from the best sources worldwide.
        We believe in offering more than just a product; we provide an
        unparalleled shopping experience. Our attentive, knowledgeable staff are
        committed to answering your questions, helping you find exactly what you
        need, and ensuring your satisfaction with every purchase. Furthermore,
        our commitment to sustainability means that when you buy from us, you're
        also contributing to a healthier planet. With our exceptional variety,
        competitive prices, fast and secure shipping, and dedicated customer
        service, shopping at our store is not just a choice, it's a smart
        decision. Experience the difference today and see why countless
        customers choose us as their trusted shopping destination.
      </p>
    </div>
  );
};

export default About;
