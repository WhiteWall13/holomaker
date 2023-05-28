import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const InfoZone = ({ currentFile }) => {
  useEffect(() => {
    if (!currentFile) {
      return;
    }

    return () => {
      // Clean up any resources or subscriptions related to currentFile
    };
  }, [currentFile]);

  if (!currentFile) {
    return (
      <Box sx={{ width: '34%', padding: '10px' }}>
        <h2>File Information</h2>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              No file selected
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '34%', padding: '10px' }}>
      <h2>File Information</h2>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            Selected file: {currentFile.name}
          </Typography>
          {/* Placeholder for file preview */}
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant="body2" color="text.secondary">
              File preview would go here.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InfoZone;
