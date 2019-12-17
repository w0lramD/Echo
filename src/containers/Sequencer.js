import React, { useState } from "react";
import { connect } from "react-redux";
import { setBpm, setTime } from "../actions";
import PlayToggle from "../toggles/PlayToggle";
import BpmSlider from "../sliders/BpmSlider";
import Track from "./Track.js";
import "./Sequencer.css";

let Sequencer = ({ tracks, time, startTimer, bpm, onBpmChange }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="Sequencer">
      <div className="controls">
        <PlayToggle
          value={playing}
          onChange={() => {
            setPlaying(!playing);
            startTimer(time);
          }}
        />
        <BpmSlider value={bpm} onChange={newBpm => onBpmChange(newBpm)} />
      </div>
      {tracks &&
        tracks.map((props, i) => {
          const { id, component } = props;
          return (
            <Track key={i} id={id} component={component} playing={playing} />
          );
        })}
    </div>
  );
};

let _bpm;
Sequencer = connect(
  state => {
    const { time, bpm } = state.sequencer;
    _bpm = bpm;
    return { time, bpm };
  },
  dispatch => {
    const onBpmChange = newBpm => {
      dispatch(setBpm(newBpm));
    };
    const startTimer = time => {
      if (_bpm) {
        function timer(time) {
          dispatch(setTime(time));
          setTimeout(() => timer(time + 1), (60 * 1000) / _bpm / 4);
        }
        if (!time) timer(0);
      }
    };
    return { onBpmChange, startTimer };
  }
)(Sequencer);

export default Sequencer;
