import React from "react";

import TempoControls from "./containers/TempoControls";
import Sequencer from "./containers/Sequencer";
import OscControls from "./containers/OscControls";
import FilterControls from "./containers/FilterControls";
import EchoControls from "./containers/EchoControls";
import PlayControls from "./containers/PlayControls";
import Score from "./containers/Score";
import Synth from "./containers/Synth";
import "./App.sass";

function App() {
  return (
    <>
      <div className="App">
        <TempoControls />
        <Sequencer />
        <div>
          <OscControls />
          <FilterControls />
        </div>
        <EchoControls />
        <PlayControls />
        <Synth />
      </div>
      <Score />
    </>
  );
}

export default App;
