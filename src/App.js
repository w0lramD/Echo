import React from "react";
import Track from "./containers/Track";
import Sequencer from "./containers/Sequencer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sequencer defBpm={120} defBeats={4}>
        <Track id="track_one" defSteps={[48, 48, 48, 48]} />
        <Track id="track_two" defSteps={[48, 48, 48, 48]} />
        <Track id="track_three" defSteps={[48, 48, 48, 48]} />
        <Track id="track_four" defSteps={[48, 48, 48, 48]} />
      </Sequencer>
    </div>
  );
}

export default App;
