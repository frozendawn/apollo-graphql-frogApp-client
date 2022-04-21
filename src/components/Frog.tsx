import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

interface Props {
  frog: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    numberOfViews: number;
  };
}

const INCREMENT_FROG_VIEWS = gql`
  mutation IncrementFrogViews ($id: ID!) {
    incrementFrogViews(id: $id) {
      code
      success
      message
      frog {
        numberOfViews
      }
    }
  }
`;

const Frog: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [incrementFrogViews] = useMutation(INCREMENT_FROG_VIEWS)
    const navigateToDetails = () => {
      incrementFrogViews({
        variables: {
          id: props.frog.id
        }
      });
        navigate(`/frog/${props.frog.id}`)
    }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.frog.imageUrl ? props.frog.imageUrl : 'https://cdn.frankerfacez.com/avatar/twitch/507665757'}
        sx={{objectFit: "cover"}}
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
        <Button size="small" onClick={navigateToDetails} sx={{color: "#357906"}}>View</Button>
        <Typography variant="body2" color="text.secondary">
          {props.frog.numberOfViews}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Frog;
