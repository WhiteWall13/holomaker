import React, { useState } from 'react';
import FileZone from './components/FileZone';
import SettingsZone from './components/SettingsZone';
import InfoZone from './components/InfoZone';
import { CssBaseline, Box } from '@mui/material';

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <FileZone onFileSelect={handleFileSelect} onFileDelete={handleFileDelete} />
      <SettingsZone currentFile={currentFile} onSettingsChange={handleSettingsChange} fileSettings={fileSettings[currentFile?.id] || {}} />
      <InfoZone currentFile={currentFile} />
    </Box>
  );
};

export default App;
