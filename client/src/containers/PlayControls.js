import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Tone from "tone";
import "./PlayControls.sass";

let PlayControls = ({ playing, onPlayChange }) => {
  return (
    <div className="PlayControls">
      <div
        className="playbutton"
        onClick={() => {
          Tone.context.resume();
          onPlayChange(playing);
        }}
      >
        {(playing && "stop") || "play"}
      </div>
    </div>
  );
};

let _bpm, _timer;
PlayControls = connect(
  state => {
    const { playing, time, bpm } = state.sequencer;
    _bpm = bpm;
    return { playing, time, bpm };
  },
  dispatch => {
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
    return {
      onPlayChange
    };
  }
)(PlayControls);

export default PlayControls;
