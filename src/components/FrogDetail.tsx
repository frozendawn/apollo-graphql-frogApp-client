import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";

interface Props {}

const GET_FROG_BY_ID = gql`
  query GetFrog($id: ID!) {
    getFrog(id: $id) {
      name
      description
      imageUrl
      numberOfViews
      userId {
        username
        image
      }
    }
  }
`;

const FrogDetail: React.FC<Props> = () => {
  const params = useParams();

  const { loading, error, data, refetch } = useQuery(GET_FROG_BY_ID, {
    variables: {
      id: params.id,
    },
  });
  refetch();
  return (
    <Container maxWidth="md">
      {loading ? (
        "loading..."
      ) : (
        <Grid
          flexDirection={"column"}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justifyContent={"space-between"} alignItems="center">
            <CardHeader
              avatar={
                <Avatar alt="user avatar" src={data!.getFrog!.userId!.image} />
              }
              title={data!.getFrog!.userId!.username}
            />
            <Typography paragraph={true}>
              {data!.getFrog!.numberOfViews} views
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt={data.getFrog.description}
              src={data.getFrog.imageUrl}
            />
          </Grid>
          <Grid
            flexDirection={"row"}
            container
          >
            <Grid item md={6}></Grid>
          </Grid>
          <Grid item>
            <Typography paragraph={true}>{data.getFrog.description}</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FrogDetail;
