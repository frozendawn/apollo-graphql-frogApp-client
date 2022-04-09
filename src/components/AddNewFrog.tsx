import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

interface Props {}
interface FormFieldValuesInterface {
  name: string;
  description: string;
  imageUrl: string;
}

const ADD_FROG = gql`
mutation AddFrog($name: String!, $description: String!, $imageUrl: String!) {
    addFrog(name: $name, description: $description, imageUrl: $imageUrl) {
        success
        message
    }
}
`;

const AddNewFrog: React.FC<Props> = () => {
  const [formFieldValues, setFormFieldValues] =
    useState<FormFieldValuesInterface>({
      name: "",
      description: "",
      imageUrl: ""
    });

  const onBlurHandler = (e: any) => {
    setFormFieldValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [addFrog, { data, loading, error }] = useMutation(ADD_FROG, {
      variables: {
        name: formFieldValues.name,
        description: formFieldValues.description,
        imageUrl: formFieldValues.imageUrl
      }
  });

  const onSubmitHander = (e:any) => {
      console.log('hello')
    e.preventDefault();
    addFrog();
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
