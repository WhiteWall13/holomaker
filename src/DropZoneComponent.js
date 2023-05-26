// src/DropzoneComponent.js

import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

// Styles for the dropzone component
const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
};

// Styles when a file is being dragged into the dropzone
const activeStyle = {
  borderColor: '#2196f3',
};

// Styles when a valid file is dragged into the dropzone
const acceptStyle = {
  borderColor: '#00e676',
};

// Styles when an invalid file is dragged into the dropzone
const rejectStyle = {
  borderColor: '#ff1744',
};

function DropzoneComponent(props) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
  ]);

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <div>Drag and drop your images here.</div>
    </div>
  );
}

export default DropzoneComponent;
