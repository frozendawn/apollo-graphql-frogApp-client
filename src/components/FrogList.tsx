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

const FrogList: React.FC<Props> = () => {
    
    const GET_FROGS = gql`
    query {
      getFrogs {
        id
        description
        name
        imageUrl
      }
    }
  `;

const {loading, error, data} = useQuery(GET_FROGS);
const [frogs, setFrogs] = useState<FrogInterface[]>([]);

useEffect(() => {
    if (!loading && !error) {
        setFrogs(data.getFrogs);
    }
},[data, loading, error])



  return (
    <Container>
      <Grid container spacing={2}>
        {frogs
          ? frogs.map((frog) => {
              return (
                <Grid key={frog.id} item xs={4}>
                  <Frog frog={frog}/>
                </Grid>
              );
            })
          : "no frogs"}
      </Grid>
    </Container>
  );
};

export default FrogList;
