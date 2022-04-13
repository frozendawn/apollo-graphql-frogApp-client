import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {GET_FROGS} from './FrogList';
import AuthenticationContext from '../store/auth-context';

interface Props {}
interface FormFieldValuesInterface {
  name: string;
  description: string;
  imageUrl: string;
}

interface Frog {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  }

const ADD_FROG = gql`
  mutation AddFrog($name: String!, $description: String!, $imageUrl: String!, $userId: ID!) {
    addFrog(name: $name, description: $description, imageUrl: $imageUrl, userId: $userId) {
      code
      message
      success
      frog {
        id
        name
        description
        imageUrl
      }
    }
  }
`;

const AddNewFrog: React.FC<Props> = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);
  console.log(authCtx);

  const [formFieldValues, setFormFieldValues] =
    useState<FormFieldValuesInterface>({
      name: "",
      description: "",
      imageUrl: "",
    });

  const onBlurHandler = (e: any) => {
    setFormFieldValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [addFrog] = useMutation(ADD_FROG, {
    variables: {
      name: formFieldValues.name,
      description: formFieldValues.description,
      imageUrl: formFieldValues.imageUrl,
      userId: authCtx!.user!.id
    },
    refetchQueries: [{query: GET_FROGS}]
  });

  const onSubmitHander = async (e: any) => {
    e.preventDefault();
    try {
      const response = await addFrog();
      if (response.data.addFrog.success) {
        console.log(response.data.addFrog.success);
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
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
              label="Name"
              variant="outlined"
              name="name"
              onBlur={onBlurHandler}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              onBlur={onBlurHandler}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="outlined-basic"
              label="Image url"
              variant="outlined"
              name="imageUrl"
              onBlur={onBlurHandler}
            />
          </Grid>
          <Grid item md={12}>
            <Button type="submit" variant="text" sx={{ width: "100%" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddNewFrog;
