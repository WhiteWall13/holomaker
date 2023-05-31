import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const handleDownloadClick = () => {
    // Implement download functionality here
    console.log('Download button clicked');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={handleDownloadClick}>
          Download
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
