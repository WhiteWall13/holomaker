import React, { useState } from 'react';

function ModelLoader({ onModelLoad }) {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    onModelLoad(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>Loaded model: {selectedFile.name}</p>}
    </div>
  );
}

export default ModelLoader;
