import React from "react";
import ComputersCanvas from "./ComputersCanvas";
import { ComputerModel } from "./ComputerModel";
import './App.css';

function App() {
  return (
    <div className="App">
      <ComputersCanvas>
        <Suspense fallback={null}>
          <ComputerModel />
        </Suspense>
      </ComputersCanvas>
    </div>
  );
}

export default App;
