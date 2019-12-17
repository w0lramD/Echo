import React from "react";
import Sequencer from "./containers/Sequencer";
import Synth from "./containers/Synth";
import NoteSlider from "./sliders/NoteSlider";
import WaveformToggle from "./toggles/WaveformToggle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sequencer
        id="echo"
        tracks={[
          { id: "note", component: NoteSlider },
          { id: "modulationType", component: WaveformToggle }
        ]}
      />
      <Synth />
    </div>
  );
}

export default App;
