import { Button, Typography, Box } from '@mui/material';
import React from 'react';

export default function Demo3() {
  const loadData = async () => {
    for (let i = 0; i < 50; i++) {
      const style = document.createElement('link');
      style.href = 'http://localhost:13003/style.css?' + i;
      style.rel = 'stylesheet';
      document.body.appendChild(style);
      style.onload = () => { style.remove() } // not to break styles
    }
  };

  return (
    <>
      <Typography variant="h4" paddingBottom={5} textAlign="center">
        Demo 3 - Head-Of-Line Problem
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" onClick={loadData}>
          Load Resources
        </Button>
      </Box>
    </>
  );
}
