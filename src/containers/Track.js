import React from "react";
import { connect } from "react-redux";
import { setSteps, setDirection } from "../actions";
import DirectionToggle from "../toggles/DirectionToggle";
import "./Track.css";

const getCurrentStep = (playing, steps, direction, time) => {
  if (playing && steps) {
    switch (direction) {
      //forwards
      case 0:
        return time % steps.length;
      //backwards
      case 1:
        let fwdStep = time % steps.length;
        return steps.length - fwdStep - 1;
      //forwards-backwards
      case 2:
        let fwdStep2 = time % (steps.length * 2);
        if (fwdStep2 >= steps.length)
          return steps.length - (fwdStep2 % steps.length) - 1;
        else return fwdStep2;
      //random
      case 3:
        return Math.floor(Math.random() * steps.length);
      default:
        return null;
    }
  }
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
        steps.map((value, i) => {
          let currentStep = getCurrentStep(playing, steps, direction, time);
          props.synth.currentStep = currentStep;
          return (
            <Component
              key={i}
              value={value}
              onChange={stepValue => {
                let newSteps = [...steps];
                newSteps[i] = stepValue;
                onStepsChange(id, newSteps);
              }}
              focus={i === currentStep}
            />
          );
        })}
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
