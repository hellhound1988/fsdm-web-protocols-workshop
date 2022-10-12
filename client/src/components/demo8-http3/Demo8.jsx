import { Button, Typography, Box } from '@mui/material';
import React from 'react';

export default function Demo8() {
  const loadData = async () => {
    for (let i = 0; i < 50; i++) {
      const style = document.createElement('link');
      style.href = 'https://quic.aiortc.org/style.css?' + i;
      style.rel = 'stylesheet';
      document.body.appendChild(style);
      style.onload = () => { style.remove() } // not to break styles
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" paddingBottom={5}>
        Demo 8 - HTTP/3 and QUIC
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" onClick={loadData}>
          Load Resources over HTTP/3
        </Button>
      </Box>
    </>
  );
}
