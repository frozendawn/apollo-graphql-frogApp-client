import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface Props {
  frog: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string
  };
}

const Frog: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`/frog/${props.frog.id}`)
    }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.frog.imageUrl ? props.frog.imageUrl : 'https://cdn.frankerfacez.com/avatar/twitch/507665757'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.frog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.frog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateToDetails} >View</Button>
      </CardActions>
    </Card>
  );
};

export default Frog;
