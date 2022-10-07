import { Button, List, ListItem, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';
import * as proto from '../../proto/demo_grpc_web_pb';

export default function Demo7() {
  const [profile, setProfile] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [history, setHistory] = React.useState(null);

  const client = new proto.DemoServicePromiseClient('http://localhost:9211', null, null);

  const loadData = async () => {
    const empty = new proto.Empty();
    const profile = await client.getProfile(empty);
    setProfile(profile.toObject());
    const location = await client.getLocation(empty);
    setLocation(location.toObject());

    const history = [];
    const historyStream = client.getHistory(empty);
    historyStream.on('data', function (response) {
      history.push(response.toObject());
      setHistory([...history]);
    });
    historyStream.on('status', function (status) {
      console.log(status);
    });
    historyStream.on('end', function (end) {
      // stream end signal
    });
    historyStream.on('error', function (err) {
      console.log(err);
    });
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" paddingBottom={5}>
        Demo 7 - gRPC & Native Streaming
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" onClick={loadData}>
          Load Data over gRPC
        </Button>
      </Box>
      {profile && location && history ? (
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <h3>Profile</h3>
                {Object.entries(profile).map(([k, v]) => (
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
                {Object.entries(location).map(([k, v]) => (
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
                  {history.map((entry) => (
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
