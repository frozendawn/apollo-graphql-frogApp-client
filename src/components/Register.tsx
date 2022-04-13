import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import AuthenticationContext from "../store/auth-context";
import { useContext } from "react";

interface Props {}

interface FormInput {
  username: string;
  password: string;
}

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    Register(username: $username, password: $password) {
      code
      success
      message
      accessToken
      id
      username
    }
  }
`;

const Register: React.FC<Props> = () => {
  const [formInputFields, setFormInputFields] = useState<FormInput>({
    username: "",
    password: "",
  });
  console.log(formInputFields);

  const [registerUser] = useMutation(REGISTER, {
    variables: {
      username: formInputFields.username,
      password: formInputFields.password,
    },
  });
  const authCtx = useContext(AuthenticationContext);
  console.log(authCtx)

  const onSubmitHander = async (e: any) => {
    e.preventDefault();
    const response = await registerUser();
    console.log('response', response)
    if (response && response.data.Register.success) {
      authCtx.login(response.data.Register.username, response.data.Register.accessToken, response.data.Register.id)
    }
  };

  const onBlurHandler = (e: any) => {
    setFormInputFields((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Container>
      <form onSubmit={onSubmitHander}>
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
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              onBlur={onBlurHandler}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onBlur={onBlurHandler}
            />
          </Grid>
          <Grid item md={12}>
            <Button type="submit" variant="text" sx={{ width: "100%" }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
