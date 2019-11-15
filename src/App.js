import React from "react";
import "./App.css";
import Toggle from "./components/Toggle";
import Number from "./components/Number";
import Track from "./components/Track";
import JZZ from "jzz";

let midiOut = JZZ().openMidiOut();
let midiIn = JZZ().openMidiIn();

//Sequencer Logic
let notes = [60];
let noteIndexCounter = 0;
function setNotes({ target }) {
  notes = target.value.split(" ") || [60];
}

let probSteps = Array(16).fill(1);
let probTracks = Array(4).fill(1);
let playStep;
midiOut.then(() => {
  playStep = (step, index, track) => {
    if (step) {
      let nn = notes[noteIndexCounter % notes.length];
      let vel = 60 + Math.round(Math.random() * 30);
      midiOut.ch(track).noteOn(nn, vel);
      noteIndexCounter++;
    }
  };
});

//MIDI echo
let echoFlag = false;
const echo = JZZ.Widget({
  _receive: function(msg) {
    let resend = () => {
      if (echoFlag) {
        this.wait(500).emit(msg);
        setTimeout(resend, 500);
      }
    };
    resend();
  }
});
midiIn.connect(echo);
echo.connect(midiOut);

function App() {
  return (
    <div className="App">
      <div className="sequencer-container">
        <div className="porb-steps-container">
          {[...Array(16).keys()].map(i => (
            <Number
              key={"dial-step-" + i}
              step={0.01}
              min={0}
              max={1}
              value={probSteps[i]}
              onChange={val => (probSteps[i] = val)}
            />
          ))}
        </div>
        <div className="inliner">
          <div className="tracks-container">
            <Track
              steps={[...Array(16).fill(false)]}
              onNext={(step, index) => playStep(step, index, 0)}
            />
            <Track
              steps={[...Array(16).fill(false)]}
              onNext={(step, index) => playStep(step, index, 1)}
            />
            <Track
              steps={[...Array(16).fill(false)]}
              onNext={(step, index) => playStep(step, index, 2)}
            />
            <Track
              steps={[...Array(16).fill(false)]}
              onNext={(step, index) => playStep(step, index, 3)}
            />
          </div>
          <div className="prob-tracks-container">
            {[...Array(4).keys()].map(i => (
              <Number
                key={"dial-track-" + (3 - i)}
                step={0.01}
                min={0}
                max={1}
                value={probTracks[3 - i]}
                onChange={val => (probTracks[3 - i] = val)}
              />
            ))}
          </div>
        </div>
        <input className="midi-nn" type="text" onChange={setNotes} />
        <div className="echo">
          <p>MIDI echo: </p>
          <Toggle
            labelOnTrue="ON"
            labelOnFalse="OFF"
            onToggle={state => (echoFlag = !state)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
