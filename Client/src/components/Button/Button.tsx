import "./button.css";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  color: string;
};

const Button: React.FC<ButtonProps> = ({ type, text, color }) => {
  return (
    <button className="button" type={type} style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

export default Button;
