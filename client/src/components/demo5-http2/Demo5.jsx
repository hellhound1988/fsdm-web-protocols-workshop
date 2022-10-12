import { Button, Typography, Box } from '@mui/material';
import React from 'react';

export default function Demo5() {
  const loadData = async () => {
    for (let i = 0; i < 50; i++) {
      const style = document.createElement('link');
      style.href = 'https://localhost:13005/style.css?' + i;
      style.rel = 'stylesheet';
      document.body.appendChild(style);
      style.onload = () => { style.remove() } // not to break styles
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Demo 5 - HTTP/2
      </Typography>
      <Typography component="p" textAlign="center" paddingBottom={5}>
        (Enable chrome://flags/#allow-insecure-localhost)
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" onClick={loadData}>
          Load Resources over HTTP/2
        </Button>
      </Box>
    </>
  );
}
