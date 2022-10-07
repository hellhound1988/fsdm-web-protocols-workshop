import { Button, List, ListItem, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';

export default function Demo1() {
  const [profile, setProfile] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [history, setHistory] = React.useState(null);

  const loadData = async () => {
    const [p, l, h] = await Promise.all([
      fetch('http://localhost:13001/api/profile').then((r) => r.json()),
      fetch('http://localhost:13001/api/location').then((r) => r.json()),
      fetch('http://localhost:13001/api/history').then((r) => r.json()),
    ]);
    setProfile(p);
    setLocation(l);
    setHistory(h);
  };

  return (
    <>
      <Typography variant="h4" paddingBottom={5} textAlign="center">
        Demo 1 - HTTP Request
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" onClick={loadData}>
          Load My Data
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
                  {history.data.map((entry) => (
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
