import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProductState } from "../../hooks/useProductState";
import { Product } from "../../models/Product";
import "./ProductsCarousel.css";
import { Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

const ProductsCarousel = () => {
  const { products } = useProductState();

  // Create a copy of the products array
  const productsCopy = [...products];

  // Shuffle the copied array
  const shuffledProducts = productsCopy.sort(() => 0.5 - Math.random());

  // Get the first 10 items from the shuffled array
  const randomTenProducts = shuffledProducts.slice(0, 10);

  const { isXsScreen } = useResponsive();

  return (
    <div className="carouselContainer center purpleText">
      <Typography
        variant="h3"
        gutterBottom
        className="purpleText"
        sx={{
          whiteSpace: "nowrap",
          marginTop: "1rem",
          fontFamily: "Josefin Sans",
          fontWeight: 500,
          fontSize: isXsScreen ? "1.9rem" : "2.5rem",
        }}
      >
        Some of our products
      </Typography>
      <Carousel className="productsCarousel">
        {randomTenProducts.map((product: Product) => (
          <div key={product._id}>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}${product.imagePath}`}
              alt={product.productName}
            />
            <p className="legend">{product.productName}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
