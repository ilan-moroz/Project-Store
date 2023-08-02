import "./shopping.css";
import { Resizable } from "re-resizable";

const Shopping = () => {
  return (
    <div className="shopping">
      <Resizable
        defaultSize={{
          width: 600,
          height: "100%",
        }}
      >
        <div className="shopping__cart">cart</div>
      </Resizable>
      <div className="shopping__main">shopping</div>
    </div>
  );
};

export default Shopping;
