import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import AuthenticationContext from "../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

interface FormInput {
  username: string;
  password: string;
  imageUrl?: string
}

const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $image: String) {
    Register(username: $username, password: $password, image: $image) {
      code
      success
      message
      accessToken
      id
      username
      userImage
    }
  }
`;

const Register: React.FC<Props> = () => {
  const [formInputFields, setFormInputFields] = useState<FormInput>({
    username: "",
    password: "",
    imageUrl: ""
  });
  const navigate = useNavigate();

  const [registerUser] = useMutation(REGISTER, {
    variables: {
      username: formInputFields.username,
      password: formInputFields.password,
      image: formInputFields.imageUrl
    },
  });
  const authCtx = useContext(AuthenticationContext);

  const onSubmitHander = async (e: any) => {
    e.preventDefault();
    const response = await registerUser();
    if (response && response.data.Register.success) {
      authCtx.login(
        response.data.Register.username,
        response.data.Register.accessToken,
        response.data.Register.id,
        response.data.Register.userImage
      );
    return navigate('/')
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

  const uploadImageHandler = async (e: any) => {

    const formData = new FormData();
    formData.append('image',e.target.files[0])
    const response = await fetch ('http://localhost:5000/upload-image', {
      method: "POST",
      body: formData
    })
    const data = await response.json();
    setFormInputFields(prev => {
      return {
        ...prev,
        imageUrl: data.imageUrl
      }
    })
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
            <Button
              variant="contained"
              component="label"
              onChange={uploadImageHandler}
            >
              Upload File
              <input type="file" hidden name="image" />
            </Button>
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