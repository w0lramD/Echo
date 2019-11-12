import React, { useEffect } from "react";
import "./App.css";
import Knob from "./components/Knob";
import { midiConnect } from "./modules/midi";
import {} from "./modules/pattern";

function App() {
  useEffect(() => {
    (async function() {
      await midiConnect();
    })();
  }, []);

  return (
    <div className="App">
      <main>
        <div className="delay-line">
          <Knob initialValue={0} type={1} onUpdate={val => console.log(val)} />
          <Knob initialValue={0} type={1} />
        </div>
      </main>
    </div>
  );
}

export default App;
