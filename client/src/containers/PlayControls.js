import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Tone from "tone";
import "./PlayControls.sass";

let PlayControls = props => {
  let { playing, onPlayChange } = props;
  let { showingCtls, onShowingCtlsChange } = props;
  useEffect(() => {
    showingCtls = true;
    onShowingCtlsChange(showingCtls);
  }, []);
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
      <div
        className="showHideCtls"
        onClick={() => onShowingCtlsChange(!showingCtls)}
      >
        {(showingCtls && "hide status") || "show status"}
      </div>
      <div>scroll up/down with the audio on</div>
    </div>
  );
};

let _bpm, _timer;
PlayControls = connect(
  state => {
    const { playing, time, bpm } = state.sequencer;
    _bpm = bpm;
    const { showingCtls } = state.utils;
    return { playing, time, bpm, showingCtls };
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
    const onShowingCtlsChange = showingCtls => {
      dispatch(actions.setShowingCtls(showingCtls));
    };
    return { onPlayChange, onShowingCtlsChange };
  }
)(PlayControls);

export default PlayControls;
