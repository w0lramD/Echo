import React from "react";
import { connect } from "react-redux";
import { setSteps, setDirection } from "../actions";
import DirectionToggle from "../toggles/DirectionToggle";
import "./Pattern.css";

const getCurrentStepIndex = (playing, steps, direction, time) => {
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

let Pattern = props => {
  let { playing, time, steps, direction } = props;
  let { onStepsChange, onDirectionChange } = props;
  const Component = props.component;
  return (
    <div className="Pattern">
      <DirectionToggle
        value={direction}
        onChange={newDirection => onDirectionChange(newDirection)}
      />
      <div className="Pattern steps">
        {steps &&
          steps.map((value, i) => (
            <Component
              key={i}
              value={value}
              onChange={stepValue => {
                let newSteps = [...steps];
                newSteps[i] = stepValue;
                onStepsChange(newSteps);
              }}
              focus={i === getCurrentStepIndex(playing, steps, direction, time)}
            />
          ))}
      </div>
    </div>
  );
};

Pattern = connect(
  state => {
    const { steps, direction, playing, time } = state.sequencer;
    return { steps, direction, playing, time };
  },
  dispatch => {
    const onStepsChange = newSteps => {
      dispatch(setSteps(newSteps));
    };
    const onDirectionChange = newDirection => {
      dispatch(setDirection(newDirection));
    };
    return { onStepsChange, onDirectionChange };
  }
)(Pattern);

export default Pattern;
