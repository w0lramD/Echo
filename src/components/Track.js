import React, { useState } from "react";

import DirectionToggle from "./toggles/DirectionToggle";
import NoteSlider from "./sliders/NoteSlider";

export default function Track({
  defaultSteps,
  currentStep,
  onDirectionChange,
  onNoteChange
}) {
  const [steps, setSteps] = useState(defaultSteps);

  return (
    <div className="track-container">
      <DirectionToggle onChange={value => onDirectionChange(value)} />
      {steps &&
        steps.map((value, i) => (
          <NoteSlider
            key={i}
            defaultValue={value}
            onChange={value => {
              let newSteps = [...steps];
              newSteps[i] = value;
              setSteps(newSteps);
              onNoteChange(i, value);
            }}
            focus={i === currentStep}
          />
        ))}
    </div>
  );
}
