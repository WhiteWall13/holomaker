import React, { useState } from 'react';
import FileZone from './components/FileZone';
import SettingsZone from './components/SettingsZone';
import InfoZone from './components/InfoZone';
import { CssBaseline, Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const defaultSettings = {
  size: '',
  x_offset: '',
  y_offset: '',
  z_offset: '',
  x_rotation: '',
  y_rotation: '',
  z_rotation: '',
  effect: 'None',
  appearance: 'None',
  title: '',
  subtitle: ''
};

const App = () => {
  const [files, setFiles] = useState([]); // Lift files state up to App
  const [currentFile, setCurrentFile] = useState(null);
  const [fileSettings, setFileSettings] = useState([]);

  const handleFileSelect = (file) => {
    setCurrentFile(file);
    const existingFile = fileSettings.find((setting) => setting.id === file.id); // Match by ID
    if (!existingFile) {
      const newSetting = {
        id: file.id, // Include ID in the setting
        file: file.name,
        params: { ...defaultSettings }
      };
      const fileIndex = files.findIndex(f => f.id === file.id); // Match by ID
      setFileSettings((prevSettings) => [
        ...prevSettings.slice(0, fileIndex), // Insert new setting at correct index
        newSetting,
        ...prevSettings.slice(fileIndex)
      ]);
    }
  };

  // Add a new handleFileReorder function to handle reordering of fileSettings
  const handleFileReorder = (reorderedFiles) => {
    const reorderedSettings = reorderedFiles.map(file => fileSettings.find(setting => setting.id === file.id)); // Match by ID
    setFileSettings(reorderedSettings);
  };


  const handleSettingsChange = (name, value) => {
    if (currentFile) {
      setFileSettings((prevSettings) => {
        return prevSettings.map((setting) => {
          if (setting.id === currentFile.id) {
            if (name in defaultSettings) {
              return {
                ...setting,
                params: {
                  ...setting.params,
                  [name]: value || ''
                }
              };
            } else {
              return {
                ...setting,
                [name]: value || ''
              };
            }
          }
          return setting;
        });
      });
    }
  };

  const handleFileDelete = (fileId) => {
    setFileSettings((prevSettings) => prevSettings.filter((setting) => setting.id !== fileId)); // Match by ID
  };

  const generateConfigJson = () => {
    const slides = fileSettings.map((fileSetting) => {
      const { file, params } = fileSetting;
      return {
        file,
        params
      };
    });
  
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ slides }, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'config.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };  
  
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HoloMaker
          </Typography>
          <Button color="inherit" onClick={generateConfigJson}>
            Download
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <FileZone files={files} setFiles={setFiles} onFileSelect={handleFileSelect} onFileReorder={handleFileReorder} onFileDelete={handleFileDelete} />
        <SettingsZone
          key={currentFile?.name}
          currentFile={currentFile}
          onSettingsChange={handleSettingsChange}
          fileSettings={fileSettings.find((setting) => setting.id === currentFile?.id)?.params || defaultSettings}
          />
        <InfoZone currentFile={currentFile} />
      </Box>
    </Box>
  );
};

export default App;