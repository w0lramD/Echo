import React from "react";
import Sequencer from "./containers/Sequencer";
import Synth from "./containers/Synth";
import NoteSlider from "./sliders/NoteSlider";
import WaveformToggle from "./toggles/WaveformToggle";
import DelaySlider from "./sliders/DelaySlider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sequencer
        tracks={[
          { id: "note", component: NoteSlider },
          { id: "oscillatorType", component: WaveformToggle },
          { id: "filter", component: DelaySlider }
        ]}
        synth={Synth}
      />
    </div>
  );
}

export default App;
