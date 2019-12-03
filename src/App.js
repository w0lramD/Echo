import React, { useState } from "react";
import Track from "./components/Track";
import Sequencer from "./components/Sequencer";
import Synth from "./components/Synth";
import "./App.css";

function App() {
  const [note, setNote] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="App">
      <Synth
        trigger={trigger}
        note={note}
        duration={0.01}
        volume={-24}
        playing={playing}
      />
      <Sequencer
        defaultBpm={120}
        defaultBeats={4}
        onPlay={() => setPlaying(true)}
        onStop={() => setPlaying(false)}
      >
        <Track
          defaultSteps={[48, 48, 48, 48]}
          defaultDirection={"→"}
          onNextStep={n => {
            setNote(n);
          }}
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
