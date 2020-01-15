import React from "react";
import Sequencer from "./containers/Sequencer";
import Synth from "./containers/Synth";
import Pattern from "./containers/Pattern";
import NoteSlider from "./sliders/NoteSlider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sequencer pattern={<Pattern component={NoteSlider} />} />
      <Synth />
    </div>
  );
}

export default App;
