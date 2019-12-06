import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { setTrack, setTrackCurrentStep } from "../actions";
import DirectionToggle from "../toggles/DirectionToggle";
import "./Track.css";

let Track = ({ dispatch, id, component }) => {
  const steps = useSelector(state => {
    let seq = state.sequencer;
    return seq.tracks && seq.tracks[id] && seq.tracks[id].steps;
  });

  const direction = useSelector(state => {
    let seq = state.sequencer;
    return seq.tracks && seq.tracks[id] && seq.tracks[id].direction;
  });

  const currentStep = useSelector(state => {
    let track = state.sequencer.tracks[id];
    let { steps, direction } = track;
    if (steps && direction) {
      let currentStep = state.sequencer.currentTime % steps.length;
      if (direction === "←") {
        currentStep = steps.length - currentStep - 1;
      } else if (direction === "?") {
        currentStep = Math.floor(Math.random() * steps.length);
      } else if (direction === "↔") {
        currentStep = state.sequencer.currentTime % (steps.length * 2);
        if (currentStep >= steps.length) {
          currentStep = steps.length - (currentStep % steps.length) - 1;
        }
      }

      return currentStep;
    } else return null;
  });

  useEffect(() => {
    dispatch(setTrackCurrentStep(id, currentStep));
  }, [currentStep, dispatch, id]);

  const Component = component;
  return (
    <div className="Track">
      <DirectionToggle
        currentValue={direction}
        onChange={direction => dispatch(setTrack(id, steps, direction))}
      />
      {steps &&
        steps.map((value, i) => (
          <Component
            key={i}
            defaultValue={value}
            onChange={stepValue => {
              let newSteps = [...steps];
              newSteps[i] = stepValue;
              dispatch(setTrack(id, newSteps, direction));
            }}
            focus={i === currentStep}
          />
        ))}
    </div>
  );
};
Track = connect()(Track);

export default Track;
