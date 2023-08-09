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

const CardComp: React.FC<cardProps> = ({ name, price, imagePath, id }) => {
  console.log(`http://localhost:4000/${imagePath}`);

  return (
    <Card sx={{ maxWidth: 345 }} key={id}>
      <CardMedia
        sx={{ height: 140 }}
        image={`http://localhost:4000/${imagePath}`}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          &#8362; {price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default CardComp;
