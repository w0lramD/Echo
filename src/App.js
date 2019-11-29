import React from "react";
import Track from "./components/Track";
import Sequencer from "./components/Sequencer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sequencer defaultBpm={120} defaultBeats={4}>
        <Track
          defaultSteps={[48, 48, 48, 48]}
          defaultDirection={"→"}
          onNextStep={() => {}}
        />
        <Track
          defaultSteps={[48, 48, 48, 48]}
          defaultDirection={"→"}
          onNextStep={() => {}}
        />
        <Track
          defaultSteps={[48, 48, 48, 48]}
          defaultDirection={"→"}
          onNextStep={() => {}}
        />
        <Track
          defaultSteps={[48, 48, 48, 48]}
          defaultDirection={"→"}
          onNextStep={() => {}}
        />
      </Sequencer>
    </div>
  );
}

export default App;
