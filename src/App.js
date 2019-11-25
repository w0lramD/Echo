import React from "react";
import Track from "./components/Track";
import "./App.css";

let clock = new Event("clock");
function next() {
  document.dispatchEvent(clock);
  setTimeout(next, 100);
}
next();

function App() {
  return (
    <div className="App">
      <Track
        defaultSteps={[48, 48, 48, 48, 48, 48, 48, 48]}
        onChange={console.log}
      />
    </div>
  );
}

export default App;
