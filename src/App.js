import React, { useState } from "react";
import "./App.css";
import MindARViewer from "./mindar-viewer";
import MindARThreeViewer from "./mindar-three-viewer";

function App() {
  const [started, setStarted] = useState(null);

  return (

      <div className="control-buttons">
        {started === null && (
          <button
            onClick={() => {
              setStarted("aframe");
            }}
          >
            Start AFRAME version
          </button>
        )}
        {started === null && (
          <button
            onClick={() => {
              setStarted("three");
            }}
          >
            Start ThreeJS version
          </button>
        )}
        {started !== null && (
          <button
            onClick={() => {
              setStarted(null);
            }}
          >
            Stop
          </button>
        )}
      </div>

      {started === "aframe" && (
        <div className="container" style={{ width: "100%", height: "100vh" }}>
          <MindARViewer />
        </div>
      )}

      {started === "three" && (
        <div className="container" style={{ width: "100%", height: "100vh" }}>
          <MindARThreeViewer />
        </div>
      )}
    </div>
  );
}

export default App;
