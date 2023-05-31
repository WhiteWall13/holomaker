import React, { useState } from 'react';
import FileZone from './components/FileZone';
import SettingsZone from './components/SettingsZone';
import InfoZone from './components/InfoZone';
import { CssBaseline, Box, Button, AppBar, Toolbar, Typography } from '@mui/material';

const App = () => {
  const [currentFile, setCurrentFile] = useState(null);
  const [fileSettings, setFileSettings] = useState({});

  const handleFileSelect = (file) => {
    setCurrentFile(file);
  };

  const handleSettingsChange = (name, value) => {
    if (currentFile) {
      setFileSettings({
        ...fileSettings,
        [currentFile.id]: {
          ...(fileSettings[currentFile.id] || {}),
          [name]: value,
        },
      });
    }
  };

  const handleFileDelete = (fileId) => {
    setFileSettings((prevSettings) => {
      const newSettings = { ...prevSettings };
      delete newSettings[fileId];
      return newSettings;
    });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            File Manager
          </Typography>
          <Button color="inherit">Download</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
      }}>
        <FileZone onFileSelect={handleFileSelect} onFileDelete={handleFileDelete} />
        <SettingsZone key={currentFile?.id} currentFile={currentFile} onSettingsChange={handleSettingsChange} fileSettings={fileSettings[currentFile?.id] || {}} />
        <InfoZone currentFile={currentFile} />
      </Box>
    </Box>
  );
};

export default App;
