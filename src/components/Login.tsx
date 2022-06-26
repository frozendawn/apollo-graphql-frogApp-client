import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import AuthenticationContext from "../store/auth-context";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface Props {}

interface FormInput {
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    Login(username: $username, password: $password) {
      code
      success
      message
      id
      accessToken
      username
      userImage
      role
    }
  }
`;

const Login: React.FC<Props> = () => {
  const authCtx = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [formFieldValues, setFormFieldValues] = useState<FormInput>({
    username: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formFieldValues.username,
      password: formFieldValues.password,
    },
  });

  const onSubmitHander = async (e: any) => {
    e.preventDefault();
    const response = await loginUser();
    if (response && response!.data!.Login.success) {
      localStorage.setItem("token", response.data.Login.accessToken);
      authCtx.login(
        response.data.Login.username,
        response.data.Login.accessToken,
        response.data.Login.id,
        response.data.Login.role,
        response.data.Login.userImage
      );
      return navigate("/");
    }
  };

  const onBlurHandler = (e: any) => {
    setFormFieldValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Container>
      <form
        onSubmit={onSubmitHander}
        onKeyDown={(e) => (e.key === "Enter" ? onSubmitHander : null)}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 10 }}
          spacing={2}
        >
          <Grid item md={12}>
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              onBlur={onBlurHandler}
              color="success"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              onBlur={onBlurHandler}
              color="success"
            />
          </Grid>
          <Grid item md={12}>
            <Button type="submit" variant="text" sx={{ color: "#357906" }}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
