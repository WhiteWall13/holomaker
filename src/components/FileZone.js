import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, List, ListItem, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const FileInput = styled('input')`
  display: none;
`;

const FileZone = ({ onFileSelect, onFileDelete, onFileReorder }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFiles = (uploadedFiles) => {
    const newFiles = [
      ...files,
      ...Array.from(uploadedFiles).map((file) => ({
        id: uuidv4(), // generate a new UUID for each uploaded file
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    ];
    setFiles(newFiles);
    if (uploadedFiles.length > 0) {
      onFileSelect(newFiles[0]);
    }
  };  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (file) => {
    onFileSelect(file);
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    if (selectedFile) {
      const updatedFiles = files.filter((file) => file.id !== selectedFile.id);
      setFiles(updatedFiles);
      setSelectedFile(null);
      onFileSelect(null); // Clear the selected file in the parent component
      onFileDelete(selectedFile.id); // Notify the parent component that a file has been deleted
    }
  };

  const filterAuthorizedFiles = (files) => {
    const authorizedFormats = ['.jpg', '.zip', '.GLB', '.GLTF', '.bin', '.3ds', '.obj', '.stl'];
    return files.filter((file) => {
      const fileExtension = file.name.split('.').pop();
      return authorizedFormats.includes(`.${fileExtension}`);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        handleDeleteFile();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    setFiles(reorderedFiles);
    onFileReorder(reorderedFiles); // Call onFileReorder after reordering files
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ width: '33%', padding: '10px', borderRight: '1px solid grey' }}>
        <h2>Files</h2>
        <label htmlFor="upload-button">
          <Button variant="contained" color="primary" component="span">
            Upload Files
          </Button>
        </label>
        <FileInput id="upload-button" type="file" multiple onChange={(e) => handleFiles(e.target.files)} />
        <Box
          sx={{
            border: '2px dashed grey',
            borderRadius: '5px',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            marginTop: '10px',
          }}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFiles = Array.from(e.dataTransfer.files);
            const authorizedFiles = filterAuthorizedFiles(droppedFiles);
            handleFiles(authorizedFiles);
          }}
          onDragOver={handleDragOver}
        >
          <p>Drag and drop authorized files here</p>
        </Box>
        <Box sx={{ maxHeight: '290px', overflow: 'auto' }}>
          <Droppable droppableId="files">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {files.map((file, index) => (
                  <Draggable key={file.id} draggableId={file.id} index={index}>
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        selected={selectedFile === file}
                        onClick={() => handleFileSelect(file)}
                      >
                        {file.name}
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default FileZone;
