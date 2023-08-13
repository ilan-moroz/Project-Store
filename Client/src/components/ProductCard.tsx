import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type cardProps = {
  imagePath: string;
  name: string;
  price: number;
  id: string;
};

// card template for displaying products
const ProductCard: React.FC<cardProps> = ({ name, price, imagePath, id }) => {
  return (
    <Card sx={{ width: "12rem", textAlign: "center" }} key={id}>
      <CardMedia
        sx={{ height: 100, backgroundSize: "contain" }}
        image={`http://localhost:4000/${imagePath}`}
        title={name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: "1rem" }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          &#8362; {price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small" sx={{ color: "rgb(70,23,155)" }}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
