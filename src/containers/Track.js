import React, { useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { setTrack } from "../actions";
import DirectionToggle from "../toggles/DirectionToggle";
import NoteSlider from "../sliders/NoteSlider";
import DelaySlider from "../sliders/DelaySlider";
import "./Track.css";

let Track = ({ dispatch, id, defSteps }) => {
  useEffect(() => {
    dispatch(setTrack(id, defSteps, "→"));
  }, [dispatch, id, defSteps]);

  const steps = useSelector(
    state => state.tracks && state.track[id] && state.tracks[id].steps
  );
  const direction = useSelector(
    state => state.tracks && state.track[id] && state.tracks[id].direction
  );

  const step = useRef(null);
  const currentTime = useSelector(state => state.currentTime || 0);
  useEffect(() => {
    if (steps && direction) {
      let stepPos = currentTime % steps.length;
      if (direction === "←") {
        stepPos = steps.length - step - 1;
      } else if (direction === "?") {
        stepPos = Math.floor(Math.random() * steps.length);
      } else if (direction === "↔") {
        stepPos = currentTime % (steps.length * 2 - 1);
        if (stepPos > steps.length - 2 && stepPos < steps.length * 2 - 1) {
          stepPos = steps.length - (stepPos % steps.length) - 1;
        }
      }
      step.current = stepPos;
    }
  }, [currentTime, direction, steps]);

  return (
    <div className="Track">
      <DirectionToggle
        onChange={direction => dispatch(setTrack(id, steps, direction))}
      />
      {steps &&
        steps.map((value, i) => (
          <NoteSlider
            key={i}
            defaultValue={value}
            onChange={stepValue => {
              let newSteps = [...steps];
              newSteps[i] = stepValue;
              dispatch(setTrack(id, newSteps, direction));
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
