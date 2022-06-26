import { gql, useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {}

interface User {
  id: string;
  username: string;
  role: string;
}

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      role
    }
  }
`;

const Dashboard: React.FC<Props> = () => {
  const { data } = useQuery(GET_USERS);

  const users: User[] = data?.getUsers;

  return (
    <Container maxWidth="sm" sx={{marginTop: "4rem"}}>
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
        {users
          ? users.map((user) => {
              return (
                <Grid container spacing={2} sx={{border:"1px solid black"}}>
                  <Grid key={user.id} item md={6} lg={6} xs={6} sx={{border:"1px solid red"}}>
                    <Typography color="black" gutterBottom variant="h5" component="div">
                      {user.username}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sx={{border:"1px solid yellow"}}>
                    <Button color="primary">X</Button>
                  </Grid>
                </Grid>
              );
            })
          : null}
      </Grid>
    </Container>
  );
};

export default Dashboard;
