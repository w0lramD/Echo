import React, { useState, useEffect } from "react";
import "./App.css";
import { midiConnect, midiOut, midiIn } from "./modules/midi";
import { Dial } from "react-nexusui";

function App() {
  const [delay1, setDelay1] = useState(0);
  const [feedback1, setFeedback1] = useState(0);

  useEffect(() => {
    (async function() {
      await midiConnect();

      for (const input of midiIn) {
        input.addEventListener("midimessage", onMidi);
      }

      function onMidi(e) {
        feedbackDelay(e, 500, 1);
      }

      function feedbackDelay(e, time, feedback) {
        const device = midiOut[0];
        setTimeout(() => {
          device.send(e.data);
          feedback *= feedback;
          if (feedback > 0) feedbackDelay(e, time, feedback);
        }, time);
      }
    })();
  }, [delay1, feedback1]);

  return (
    <div className="App">
      <main>
        <div className="delay-line">
          <Dial
            text="Click me"
            min={0}
            max={10}
            size={[100, 100]}
            onChange={console.log}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
