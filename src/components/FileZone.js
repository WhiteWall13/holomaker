// import React, { useState, useEffect } from 'react';
// import { Button, List, ListItem, Box } from '@mui/material';
// import styled from '@emotion/styled';

// const FileInput = styled('input')`
//   display: none;
// `;

// const FileZone = ({ onFileSelect }) => {
//   const [files, setFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFiles = (uploadedFiles) => {
//     const newFiles = [...files, ...uploadedFiles];
//     setFiles(newFiles);
//     if (uploadedFiles.length > 0) {
//       onFileSelect(uploadedFiles[0]);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const authorizedFiles = filterAuthorizedFiles(droppedFiles);
//     handleFiles(authorizedFiles);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleFileSelect = (file) => {
//     onFileSelect(file);
//     setSelectedFile(file);
//   };

//   const handleDeleteFile = () => {
//     if (selectedFile) {
//       const updatedFiles = files.filter((file) => file !== selectedFile);
//       setFiles(updatedFiles);
//       setSelectedFile(null);
//       onFileSelect(null); // Clear the selected file in the parent component
//     }
//   };

//   const filterAuthorizedFiles = (files) => {
//     const authorizedFormats = ['.jpg', '.zip', '.GLB', '.GLTF', '.bin', '.3ds', '.obj', '.stl'];
//     return files.filter((file) => {
//       const fileExtension = file.name.split('.').pop();
//       return authorizedFormats.includes(`.${fileExtension}`);
//     });
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Delete' || event.key === 'Backspace') {
//         handleDeleteFile();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedFile]);

//   return (
//     <Box sx={{ width: '33%', padding: '10px', borderRight: '1px solid grey', overflow: 'auto' }}>
//       <h2>Files</h2>
//       <label htmlFor="upload-button">
//         <Button variant="contained" color="primary" component="span">
//           Upload Files
//         </Button>
//       </label>
//       <FileInput id="upload-button" type="file" multiple onChange={(e) => handleFiles(e.target.files)} />
//       <Box
//         sx={{
//           border: '2px dashed grey',
//           borderRadius: '5px',
//           padding: '20px',
//           textAlign: 'center',
//           backgroundColor: '#f9f9f9',
//           marginTop: '10px',
//         }}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         <p>Drag and drop authorized files here</p>
//       </Box>
//       <List sx={{ maxHeight: 'calc(100vh - 280px)', overflow: 'auto' }}>
//         {files.map((file, index) => (
//           <ListItem
//             key={index}
//             button
//             onClick={() => handleFileSelect(file)}
//             selected={file === selectedFile}
//             sx={{ backgroundColor: file === selectedFile ? 'grey.200' : 'transparent' }}
//           >
//             {file.name}
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default FileZone;

import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const FileInput = styled('input')`
  display: none;
`;

const FileZone = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFiles = (uploadedFiles) => {
    const newFiles = [...files, ...uploadedFiles];
    setFiles(newFiles);
    if (uploadedFiles.length > 0) {
      onFileSelect(uploadedFiles[0]);
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
      const updatedFiles = files.filter((file) => file !== selectedFile);
      setFiles(updatedFiles);
      setSelectedFile(null);
      onFileSelect(null); // Clear the selected file in the parent component
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ width: '33%', padding: '10px', borderRight: '1px solid grey', overflow: 'auto' }}>
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
        <Droppable droppableId="files">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {files.map((file, index) => (
                <Draggable key={file.name} draggableId={file.name} index={index}>
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
    </DragDropContext>
  );
};

export default FileZone;
