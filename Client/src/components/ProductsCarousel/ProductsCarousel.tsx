import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProductState } from "../../hooks/useProductState";
import { Product } from "../../models/Product";
import "./productsCarousel.css";

const ProductsCarousel = () => {
  const { products } = useProductState();

  // Create a copy of the products array
  const productsCopy = [...products];

  // Shuffle the copied array
  const shuffledProducts = productsCopy.sort(() => 0.5 - Math.random());

  // Get the first 10 items from the shuffled array
  const randomTenProducts = shuffledProducts.slice(0, 10);

  return (
    <div className="carouselContainer center purpleText">
      <h2>Some of our products</h2>
      <Carousel className="productsCarousel">
        {randomTenProducts.map((product: Product) => (
          <div key={product._id}>
            <img
              src={`http://localhost:4000/${product.imagePath}`}
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
