import React from "react";
import DelaySlider from "./components/sliders/DelaySlider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <DelaySlider onChange={console.log} />
    </div>
  );
}

export default App;
