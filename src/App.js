import React, { useState, useEffect } from "react";
import "./App.css";
import { midiConnect, midiOut, midiIn } from "./modules/midi";
import { Dial, Sequencer, Toggle } from "react-nexusui";

function App() {
  //CC Looper
  let looperTime = 0;
  let clearLooper = false;
  midiConnect().then(() => {
    if (midiIn[0]) midiIn[0].addEventListener("midimessage", e => looper(e));
    function looper(e) {
      setTimeout(() => {
        midiOut[0].send(e.data);
        if (!clearLooper) looper(e);
      }, looperTime);
    }
  });

  //Sequencer
  let sequencer = null;
  let playing = false;
  function next() {
    if (playing) sequencer.next();
    setTimeout(next, 100);
  }
  next();

  return (
    <div className="App">
      <main>
        <div className="dials-step-container">
          {[...Array(16).keys()].map(val => (
            <div key={"dial-step-div" + val} className="dial-step">
              <Dial
                key={"dial-step-" + val}
                min={0}
                max={10}
                size={[100, 100]}
                onChange={val => (looperTime = val)}
              />
            </div>
          ))}
        </div>
        <div className="sequencer-container">
          <Sequencer
            min={0}
            max={10}
            columns={16}
            rows={4}
            size={[1600, 400]}
            onReady={seq => (sequencer = seq)}
            onStep={playStep}
          />
        </div>
        <div className="dials-track-container">
          {[...Array(4).keys()].map(val => (
            <div key={"dial-track-div" + val} className="dial-track">
              <Dial
                key={"dial-track-" + val}
                min={0}
                max={10}
                size={[100, 100]}
                onChange={val => (looperTime = val)}
              />
            </div>
          ))}
        </div>
        <Toggle state={false} onChange={state => (playing = state)} />
      </main>
    </div>
  );
}

export default App;
