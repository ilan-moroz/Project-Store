import { useProductState } from "../hooks/useProductState";

const Info = () => {
  const { products } = useProductState();
  return (
    <div className="info center">
      Available products in our store: {products.length}
    </div>
  );
};

export default Info;
