import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

export default function Demo2() {
  const [blobDataEvents, setBlobDataEvents] = React.useState([]);
  const [streamDataEvents, setStreamDataEvents] = React.useState([]);
  const [streamProcessingEvents, setStreamProcessingEvents] = React.useState([]);

  const loadBlobData = async () => {
    const events = ['load blob started: ' + new Date().toLocaleString()];
    setBlobDataEvents(events);
    const data = await fetch('http://localhost:13002/api/blob').then((r) => r.json());
    events.push('load blob finished: ' + new Date().toLocaleString());
    events.push('data size: ' + JSON.stringify(data).length);
    setBlobDataEvents([...events]);
  };

  const loadStreamData = async () => {
    const events = ['load stream started: ' + new Date().toLocaleString()];
    setStreamDataEvents(events);
    const data = await fetch('http://localhost:13002/api/stream').then((r) => r.json());
    events.push('load stream finished: ' + new Date().toLocaleString());
    events.push('data size: ' + JSON.stringify(data).length);
    setStreamDataEvents([...events]);
  };

  const streamProcessing = async () => {
    const events = ['stream processing started: ' + new Date().toLocaleString()];
    setStreamProcessingEvents(events);
    await fetch('http://localhost:13002/api/stream').then((r) => {
      const reader = r.body.getReader();
      reader.read().then(function processData({ done, value }) {
        if (done) {
          events.push('stream processing finished: ' + new Date().toLocaleString());
          setStreamProcessingEvents([...events]);
          return;
        }
        events.push(`received chunk (${value.length} bytes): ` + new Date().toLocaleString());
        setStreamProcessingEvents([...events]);
        return reader.read().then(processData);
      });
    });
  };

  return (
    <>
      <Typography variant="h4" paddingBottom={5} textAlign="center">
        Demo 2 - HTTP Streaming
      </Typography>
      <Grid container spacing={2} marginTop={5} textAlign="center">
        <Grid item xs={4}>
          <Button variant="contained" onClick={loadBlobData}>
            Load Data Blob
          </Button>
          {blobDataEvents.map((entry, i) => (
            <Typography key={i} component="p" marginTop={2}>
              {entry}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={loadStreamData}>
            Load Data Stream
          </Button>
          {streamDataEvents.map((entry, i) => (
            <Typography key={i} component="p" marginTop={2}>
              {entry}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={streamProcessing}>
            Process Data Stream
          </Button>
          {streamProcessingEvents.map((entry, i) => (
            <Typography key={i} component="p" marginTop={2}>
              {entry}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
