// File: src/components/InfoZone.js

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const InfoZone = ({ currentFile }) => {
  return (
    <Box sx={{ width: '34%', padding: '10px' }}>
      <h2>File Information</h2>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            Selected file: {currentFile ? currentFile.name : 'None'}
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
