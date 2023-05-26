// File: src/App.js

import React, { useState } from 'react';
import FileZone from './components/FileZone';
import SettingsZone from './components/SettingsZone';
import InfoZone from './components/InfoZone';
import { CssBaseline, Box } from '@mui/material';

const App = () => {
  // We keep track of the currently selected file and its settings in state variables
  const [currentFile, setCurrentFile] = useState(null);
  const [fileSettings, setFileSettings] = useState({});

  // This function will be called when a file is selected in the FileZone
  const handleFileSelect = (file) => {
    setCurrentFile(file);
  };

  // This function will be called when a setting is changed in the SettingsZone
  const handleSettingsChange = (name, value) => {
    setFileSettings({
      ...fileSettings,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <FileZone onFileSelect={handleFileSelect} />
      <SettingsZone currentFile={currentFile} onSettingsChange={handleSettingsChange} />
      <InfoZone currentFile={currentFile} />
    </Box>
  );
};

export default App;
