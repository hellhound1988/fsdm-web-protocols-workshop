import { Button, List, ListItem, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';

export default function Demo6() {
  const [httpEvents, setHttpEvents] = React.useState([]);
  const [wsEvents, setWsEvents] = React.useState([]);


  const loadDataOverHttp = async () => {
    const events = [`[${new Date().toLocaleString()}]: Request started`];
    setHttpEvents(events);
    const res1 = await fetch(`http://localhost:13006/api/long-polling?step=1`).then((r) => r.text());
    events.push(`[${new Date().toLocaleString()}]: ${res1}`);
    setHttpEvents([...events]);
    const res2 = await fetch(`http://localhost:13006/api/long-polling?step=2`).then((r) => r.text());
    events.push(`[${new Date().toLocaleString()}]: ${res2}`);
    setHttpEvents([...events]);
    const res3 = await fetch(`http://localhost:13006/api/long-polling?step=3`).then((r) => r.text());
    events.push(`[${new Date().toLocaleString()}]: ${res3}`);
    setHttpEvents([...events]);
  };

  const loadDataOverWs = async () => {
    const ws = new WebSocket('ws://localhost:13006');
    ws.addEventListener('message', (e) => {
      events.push(`[${new Date().toLocaleString()}]: ${e.data}`);
      setWsEvents([...events]);
    });
    ws.addEventListener('open', (e) => {
      events.push(`[${new Date().toLocaleString()}]: Request started`);
      setWsEvents([...events]);
      ws.send('long_request');
    });

    const events = [`[${new Date().toLocaleString()}]: Establishing connection`];
    setWsEvents(events);
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" paddingBottom={5}>
        Demo 6 - WebSocket vs. Long Polling
      </Typography>
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={loadDataOverHttp}>
            Request with Long Polling
          </Button>
          {httpEvents.map((entry, i) => (
            <Typography key={i} component="p" marginTop={2}>
              {entry}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={loadDataOverWs}>
            Request with WebSocket
          </Button>
          {wsEvents.map((entry, i) => (
            <Typography key={i} component="p" marginTop={2}>
              {entry}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
