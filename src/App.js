import React from "react";
import Track from "./containers/Track";
import Sequencer from "./containers/Sequencer";
import Synth from "./containers/Synth";
import NoteSlider from "./sliders/NoteSlider";
import WaveformToggle from "./toggles/WaveformToggle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sequencer>
        <Track id="note" component={NoteSlider} />
        <Track id="mod" component={WaveformToggle} />
      </Sequencer>
    </div>
  );
}

export default App;

//<Synth />
