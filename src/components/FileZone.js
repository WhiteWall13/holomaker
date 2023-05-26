// File: src/components/FileZone.js

import React, { useState } from 'react';
import { Button, List, ListItem, Box } from '@mui/material';
import styled from '@emotion/styled';

const FileInput = styled('input')`
  display: none;
`;

const FileZone = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    setFiles([...files, ...e.target.files]);
    if (e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const selectFile = (file) => {
    onFileSelect(file);
  };

  return (
    <Box sx={{ width: '33%', padding: '10px', borderRight: '1px solid grey' }}>
      <h2>Files</h2>
      <label htmlFor="upload-button">
        <Button variant="contained" color="primary" component="span">
          Upload Files
        </Button>
      </label>
      <FileInput id="upload-button" type="file" multiple onChange={handleFiles} />
      <List>
        {files.map((file, index) => (
          <ListItem key={index} button onClick={() => selectFile(file)}>
            {file.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileZone;
