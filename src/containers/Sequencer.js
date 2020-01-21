import React from "react";
import { connect } from "react-redux";
import { setPlaying, setBpm, setTime } from "../actions";
import IconToggle from "../toggles/IconToggle";
import BpmSlider from "../sliders/BpmSlider";
import Tone from "tone";
import "./Sequencer.css";

let Sequencer = props => {
  let { pattern } = props;
  let { playing, onPlayChange } = props;
  let { time, startTimer } = props;
  let { bpm, onBpmChange } = props;
  return (
    <div className="Sequencer">
      <div className="controls">
        <IconToggle
          value={playing}
          options={["play", "stop"]}
          onChange={() => {
            Tone.context.resume();
            onPlayChange(playing);
            startTimer(time);
          }}
        />
        <BpmSlider value={bpm} onChange={newBpm => onBpmChange(newBpm)} />
      </div>
      {pattern}
    </div>
  );
};

let _bpm;
Sequencer = connect(
  state => {
    const { playing, time, bpm } = state.sequencer;
    _bpm = bpm;
    return { playing, time, bpm };
  },
  dispatch => {
    const onPlayChange = playing => {
      dispatch(setPlaying(!playing));
    };
    const onBpmChange = newBpm => {
      dispatch(setBpm(newBpm));
    };
    const startTimer = time => {
      if (_bpm) {
        function timer(time) {
          dispatch(setTime(time)); //max 64 steps per pattern
          setTimeout(() => timer((time + 1) % 64), (60 * 1000) / _bpm / 4);
        }
        if (!time) timer(0);
      }
    };
    return { onPlayChange, onBpmChange, startTimer };
  }
)(Sequencer);

export default Sequencer;
