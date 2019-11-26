import React from "react";
import Track from "./components/Track";
import Sequencer from "./components/Sequencer";
import "./App.css";

const track1 = [48, 48, 48, 48, 48, 48, 48, 48];

function App() {
  return (
    <div className="App">
      <Sequencer
        components={[
          <Track
            defaultSteps={[...track1]}
            onNoteChange={(i, value) => (track1[i] = value)}
            onDirectionChange={console.log}
          />
        ]}
      />
    </div>
  );
}

export default App;
