import React, { useState, useEffect, useRef } from "react";
import DirectionToggle from "../components/toggles/DirectionToggle";
import NoteSlider from "../components/sliders/NoteSlider";
import DelaySlider from "../components/sliders/DelaySlider";
import { connect } from "react-redux";
import { getCurrentTime } from "../actions";
import "./Track.css";

const Track = ({ defaultSteps, defaultDirection, dispatch }) => {
  const [steps, setSteps] = useState(defaultSteps);
  const [direction, setDirection] = useState(defaultDirection);

  const step = useRef(0);
  useEffect(() => {
    let currentTime = dispatch(getCurrentTime());
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
    if (step.current) dispatch(steps[step.current]);
  }, [direction, dispatch, steps, steps.length]);

  return (
    <div className="Track">
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
      <DelaySlider onChange={() => {}} />
    </div>
  );
};
Track = connect()(Track);

export default Track;
