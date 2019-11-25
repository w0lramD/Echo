import React, { useState, useEffect, useRef } from "react";

import DirectionToggle from "./toggles/DirectionToggle";
import NoteSlider from "./sliders/NoteSlider";

export default function Track({ defaultSteps }) {
  const [steps, setSteps] = useState(defaultSteps);
  const focusedStep = useRef(0);

  useEffect(() => {
    function onClock() {
      focusedStep.current = (focusedStep.current + 1) % steps.length;
    }
    document.addEventListener("clock", onClock);
  }, [focusedStep, steps]);

  return (
    <div className="track-container">
      <DirectionToggle onChange={value => console.log(value)} />
      {steps &&
        steps.map((value, i) => (
          <NoteSlider
            key={i}
            defaultValue={value}
            onChange={value => {
              let newSteps = [...steps];
              newSteps[i] = value;
              setSteps(newSteps);
            }}
            focus={i === focusedStep}
          />
        ))}
    </div>
  );
}
