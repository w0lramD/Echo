import React, { useState, useEffect, useRef } from "react";

import DirectionToggle from "./toggles/DirectionToggle";
import NoteSlider from "./sliders/NoteSlider";

export default function Track({
  currentTime,
  defaultSteps,
  defaultDirection,
  onNextStep
}) {
  const [steps, setSteps] = useState(defaultSteps);
  const [direction, setDirection] = useState(defaultDirection);

  const step = useRef(0);
  useEffect(() => {
    step.current = currentTime % steps.length;
    if (direction === "←") {
      step.current = steps.length - step.current - 1;
    } else if (direction === "?") {
      step.current = Math.floor(Math.random() * steps.length);
    } else if (direction === "↔") {
      let pos = currentTime % (steps.length * 2 - 1);
      if (pos > steps.length - 2 && pos < steps.length * 2 - 1) {
        step.current = steps.length - (pos % steps.length) - 1;
      }
    }
    onNextStep(step.current);
  }, [currentTime, direction, onNextStep, steps.length]);

  return (
    <div className="track-container">
      <DirectionToggle onChange={value => setDirection(value)} />
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
            focus={i === step.current}
          />
        ))}
    </div>
  );
}
