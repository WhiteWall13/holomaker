import React from 'react';
import { TextField, Box } from '@mui/material';

const SettingsZone = ({ currentFile, onSettingsChange, fileSettings }) => {
  const handleSettingChange = (e) => {
    onSettingsChange(e.target.name, e.target.value);
  };

  const settings = ['Size', 'Offset X', 'Offset Y', 'X Rotation','Y Rotation', 'Rotation Z', 'Title', 'Subtitle'];

  return (
    <Box sx={{ width: '33%', padding: '10px', borderRight: '1px solid grey' }}>
      <h2>Settings</h2>
      {settings.map((setting) => (
        <TextField
          key={setting}
          label={setting}
          variant="outlined"
          fullWidth
          margin="normal"
          name={setting}
          value={fileSettings[setting] || ''} // Use the setting value for the current file, or an empty string if it's not set
          onChange={handleSettingChange}
        />
      ))}
    </Box>
  );
};

export default SettingsZone;
