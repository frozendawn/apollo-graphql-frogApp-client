import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Frog from "./Frog";
import Container from "@mui/material/Container";
import { useQuery, gql } from "@apollo/client";

interface Props {}

interface FrogInterface {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const GET_FROGS = gql`
  query {
    getFrogs {
      id
      description
      name
      imageUrl
    }
  }
`;
const FrogList: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_FROGS);
  // console.log("data in froglist", data);
  const [frogs, setFrogs] = useState<FrogInterface[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setFrogs(data.getFrogs);
    }
  }, [data, loading, error]);

  return (
    <Container>
      <Grid container spacing={2}>
        {frogs
          ? frogs.map((frog) => {
              return (
                <Grid key={frog.id} item xs={12} md={4}>
                  <Frog frog={frog} />
                </Grid>
              );
            })
          : "no frogs"}
      </Grid>
    </Container>
  );
};

export default FrogList;
