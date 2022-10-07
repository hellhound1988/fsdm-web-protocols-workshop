import { Button, List, ListItem, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';
import { request, gql } from 'graphql-request';

export default function Demo4() {
  const [data, setData] = React.useState(null);

  const loadData = async () => {
    const query = gql`
      {
        profile {
          name
          title
        }
        location {
          state
          city
        }
        history {
          data {
            id
            time
            entry
          }
        }
      }
    `;
    const res = await request('http://localhost:13004/graphql', query);
    setData(res);
  };

  return (
    <>
      <Typography variant="h4" paddingBottom={5} textAlign="center">
        Demo 4 - GraphQL Query Language
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" onClick={loadData}>
          Load GraphQL Data
        </Button>
      </Box>
      {data ? (
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <h3>Profile</h3>
                {Object.entries(data.profile).map(([k, v]) => (
                  <div key={k}>
                    <b>{k}:</b> {v}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <h3>Location</h3>
                {Object.entries(data.location).map(([k, v]) => (
                  <div key={k}>
                    <b>{k}:</b> {v}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Card variant="outlined">
              <CardContent>
                <h3>History</h3>
                <List>
                  {data.history.data.map((entry) => (
                    <ListItem key={entry.id}>
                      [{entry.time}]: {entry.entry}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      ) : null}
    </>
  );
}
