// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react'
import ModelViewer from './components/ModelViewer'
import ModelLoader from './components/ModelLoader'
import ColorSlider from './components/ColorSlider'

function App() {
  const [modelPath, setModelPath] = useState(null);
  const [format, setFormat] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleModelLoad = (file) => {
    setModelPath(URL.createObjectURL(file));
    setFormat(file.name.split('.').pop());
  };

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <ModelLoader onModelLoad={handleModelLoad} />
      <ColorSlider onColorChange={handleColorChange} />
      {modelPath && <ModelViewer format={format} modelPath={modelPath} />}
    </div>
  )
}

export default App;
