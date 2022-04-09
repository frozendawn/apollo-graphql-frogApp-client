import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface Props {}

const GET_FROG_BY_ID = gql`
  query GetFrog($id: ID!) {
    getFrog(id: $id) {
      name
      description
      imageUrl
    }
  }
`;

const FrogDetail: React.FC<Props> = () => {
  const params = useParams();
  console.log(params);

  const { loading, error, data } = useQuery(GET_FROG_BY_ID, {
    variables: {
      id: params.id,
    },
  });
  console.log(data);

  return (
      <Container>
          {loading ? 'loading...': (
                            <Grid flexDirection={"column"} container justifyContent="center" alignItems="center">
                            <Grid item>
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
                            <Grid item>
                              <Typography paragraph={true}>{data.getFrog.description}</Typography>
                            </Grid>
                       
                       </Grid>
          )}
      </Container>
  );
};

export default FrogDetail;
