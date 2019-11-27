import React from "react";
import Track from "./components/Track";
import Sequencer from "./components/Sequencer";
import "./App.css";

const track1 = [48, 48, 48, 48, 48, 48, 48, 48];

function App() {
  return (
    <div className="App">
      <Sequencer>
        <Track
          defaultSteps={[...track1]}
          defaultDirection={"→"}
          onNextStep={() => {}}
        />
      </Sequencer>
    </div>
  );
}

export default App;
