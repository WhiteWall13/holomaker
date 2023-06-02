import React from 'react';
import { TextField, Box, Grid, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';

const SettingsZone = ({ currentFile, onSettingsChange, fileSettings }) => {
  const handleSettingChange = (e) => {
    onSettingsChange(e.target.name, e.target.value);
  };  

  const effects = ['None', 'Effect1', 'Effect2', 'Effect3'];
  const appearances = ['None', 'Appearance1', 'Appearance2', 'Appearance3'];

  return (
    <Box sx={{ width: '33%', padding: '10px', borderRight: '1px solid grey', height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <h2>Settings</h2>
      <FormControl fullWidth>
        <InputLabel id="effect-label">Effect</InputLabel>
        <Select labelId="effect-label" name="effect" value={fileSettings.effect || ''} onChange={handleSettingChange} variant="filled">
          {effects.map((effect) => (
            <MenuItem key={effect} value={effect}>
              {effect}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="appearance-label">Appearance</InputLabel>
        <Select
          labelId="appearance-label"
          name="appearance"
          value={fileSettings.appearance || ''}
          onChange={handleSettingChange}
          variant="filled"
        >
          {appearances.map((appearance) => (
            <MenuItem key={appearance} value={appearance}>
              {appearance}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Size"
        variant="outlined"
        fullWidth
        margin="dense"
        size="small"
        name="size"
        value={fileSettings.size || ''}
        onChange={handleSettingChange}
      />
      <Typography variant="h6">Offset</Typography>
      <Grid container spacing={1}>
        {['X', 'Y', 'Z'].map((coordinate, i) => (
          <Grid item xs={4} key={i}>
            <TextField
              label={coordinate}
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              name={`${coordinate.toLowerCase()}_offset`}
              value={fileSettings[`${coordinate.toLowerCase()}_offset`] || ''}
              onChange={handleSettingChange}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6">Rotation</Typography>
<Grid container spacing={1}>
  {['X', 'Y', 'Z'].map((coordinate, i) => (
    <Grid item xs={4} key={i}>
      <TextField
        label={coordinate}
        variant="outlined"
        fullWidth
        margin="dense"
        size="small"
        name={`${coordinate.toLowerCase()}_rotation`} // change here
        value={fileSettings[`${coordinate.toLowerCase()}_rotation`] || ''} // change here
        onChange={handleSettingChange}
      />
          </Grid>
        ))}
      </Grid>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="dense"
        size="small"
        name="title"
        value={fileSettings.title || ''}
        onChange={handleSettingChange}
      />
      <TextField
        label="Subtitle"
        variant="outlined"
        fullWidth
        margin="dense"
        size="small"
        name="subtitle"
        value={fileSettings.subtitle || ''}
        onChange={handleSettingChange}
      />
    </Box>
  );
};

export default SettingsZone;