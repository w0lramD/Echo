import React from "react";
import { connect } from "react-redux";
import { getCurrentStepIndex } from "./_helpers";
import * as actions from "../actions";
import IconToggle from "../toggles/IconToggle";
import BpmSlider from "../sliders/BpmSlider";
import NoteSlider from "../sliders/NoteSlider";
import Tone from "tone";
import "./Sequencer.sass";

let Sequencer = props => {
  let { playing, onPlayChange } = props;
  let { time } = props;
  let { bpm, onBpmChange } = props;
  let { steps, direction } = props;
  let { onStepsChange, onDirectionChange } = props;
  return (
    <div className="Sequencer">
      <h1>Sequencer</h1>
      <div className="controls">
        <IconToggle
          value={playing}
          options={["play", "stop"]}
          onChange={() => {
            Tone.context.resume();
            onPlayChange(playing);
          }}
        />
        <IconToggle
          value={direction}
          options={["forward", "backward", "circular", "random"]}
          onChange={newDirection => onDirectionChange(newDirection)}
        />
        <BpmSlider value={bpm} onChange={newBpm => onBpmChange(newBpm)} />
      </div>
      <div className="pattern">
        <div className="pattern steps">
          {steps &&
            steps.map((value, i) => (
              <NoteSlider
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
    </div>
  );
};

let _bpm, _timer;
Sequencer = connect(
  state => {
    const { steps, direction, playing, time, bpm } = state.sequencer;
    _bpm = bpm;
    return { steps, direction, playing, time, bpm };
  },
  dispatch => {
    const onStepsChange = newSteps => {
      dispatch(actions.setSteps(newSteps));
    };
    const onDirectionChange = newDirection => {
      dispatch(actions.setDirection(newDirection));
    };
    const onPlayChange = playing => {
      function timer(time) {
        dispatch(actions.setTime(time)); //max 64 steps per pattern
        _timer = setTimeout(
          () => timer((time + 1) % 64),
          (60 * 1000) / _bpm / 4
        );
      }
      if (!playing) timer(0);
      else clearTimeout(_timer);
      dispatch(actions.setPlaying(!playing));
    };
    const onBpmChange = newBpm => {
      dispatch(actions.setBpm(newBpm));
    };
    return {
      onStepsChange,
      onDirectionChange,
      onPlayChange,
      onBpmChange
    };
  }
)(Sequencer);

export default Sequencer;
