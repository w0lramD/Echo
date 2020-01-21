import React from "react";
import { connect } from "react-redux";
import { getCurrentStepIndex } from "./Utils";
import { setSteps, setDirection } from "../actions";
import DirectionToggle from "../toggles/DirectionToggle";
import "./Pattern.css";

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
              focus={
                playing
                  ? i === getCurrentStepIndex(steps, direction, time)
                  : null
              }
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
