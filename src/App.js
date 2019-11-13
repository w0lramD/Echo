import React, { useState, useEffect } from "react";
import "./App.css";
import JZZ from "jzz";
import { Dial, Sequencer, Toggle } from "react-nexusui";

function App() {
  var midiIn = JZZ().openMidiIn();
  var midiOut = JZZ().openMidiOut();

  //CC Looper
  /*
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
  });*/

  //
  let empty = JZZ.Widget({
    _receive: function(msg) {
      console.log(msg);
      this.emit(msg);
    }
  });
  empty.connect(midiOut);

  //Sequencer
  let sequencer = null;
  let timeline;
  function next() {
    sequencer.next();
    timeline = setTimeout(next, 100);
  }
  let play = () => next();
  let stop = () => clearTimeout(timeline);

  let probSteps = Array(16).fill(1);
  let probTracks = Array(4).fill(1);
  function playStep(triggers) {
    for (let i = 0; i < triggers.length; i++)
      if (
        triggers[i] &&
        probSteps[i] > Math.random() &&
        probTracks[i] > Math.random()
      ) {
        console.log(probTracks[i]);
        empty
          .noteOn(0, "C#5", 127)
          .wait(500)
          .noteOff(0, "C#4");
      }
  }

  return (
    <div className="App">
      <main>
        <div className="dials-step-container">
          {[...Array(16).keys()].map(i => (
            <div key={"dial-step-div" + i} className="dial-step">
              <Dial
                key={"dial-step-" + i}
                min={0}
                max={1}
                value={probSteps[i]}
                interaction="vertical"
                size={[100, 100]}
                onChange={val => (probSteps[i] = val)}
              />
            </div>
          ))}
        </div>
        <div className="sequencer-container">
          <Sequencer
            columns={16}
            rows={4}
            size={[1600, 400]}
            onReady={seq => (sequencer = seq)}
            onStep={triggers => playStep(triggers)}
          />
        </div>
        <div className="dials-track-container">
          {[...Array(4).keys()].map(i => (
            <div key={"dial-track-div" + (3 - i)} className="dial-track">
              <Dial
                key={"dial-track-" + (3 - i)}
                min={0}
                max={1}
                value={probTracks[3 - i]}
                size={[100, 100]}
                onChange={val => (probTracks[3 - i] = val)}
              />
            </div>
          ))}
        </div>
        <Toggle
          state={false}
          onChange={playing => {
            if (playing) play();
            else stop();
          }}
        />
      </main>
    </div>
  );
}

export default App;
