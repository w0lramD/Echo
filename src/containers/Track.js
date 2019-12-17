import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setSteps, setDirection } from "../actions";
import DirectionToggle from "../toggles/DirectionToggle";
import "./Track.css";

const getCurrentStep = (playing, steps, direction, time) => {
  if (playing && steps && direction !== undefined) {
    let currentStep = time % steps.length; //forwards
    if (direction === "backwards") {
      currentStep = steps.length - currentStep - 1;
    } else if (direction === "random") {
      currentStep = Math.floor(Math.random() * steps.length);
    } else if (direction === "circular") {
      currentStep = time % (steps.length * 2);
      if (currentStep >= steps.length) {
        currentStep = steps.length - (currentStep % steps.length) - 1;
      }
    }
    return currentStep;
  } else return null;
};

let Track = props => {
  let { playing, time, id, tracks } = props;
  let { steps, direction } = tracks[id];

  const Component = props.component;
  let { onStepsChange, onDirectionChange } = props;
  return (
    <div className="Track">
      <DirectionToggle
        value={direction}
        onChange={newDirection => onDirectionChange(id, newDirection)}
      />
      {steps &&
        steps.map((value, i) => (
          <Component
            key={i}
            value={value}
            onChange={stepValue => {
              let newSteps = [...steps];
              newSteps[i] = stepValue;
              onStepsChange(id, newSteps);
            }}
            focus={i === getCurrentStep(playing, steps, direction, time)}
          />
        ))}
    </div>
  );
};

Track = connect(
  state => {
    const { tracks, time } = state.sequencer;
    return { tracks, time };
  },
  dispatch => {
    const onStepsChange = (id, newSteps) => {
      dispatch(setSteps(id, newSteps));
    };
    const onDirectionChange = (id, newDirection) => {
      dispatch(setDirection(id, newDirection));
    };
    return { onStepsChange, onDirectionChange };
  }
)(Track);

export default Track;
