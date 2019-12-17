import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setBpm, setTransport, resetTime, incrementTime } from "../actions";
import BpmSlider from "../sliders/BpmSlider";
import PlayToggle from "../toggles/PlayToggle";
import "./Sequencer.css";

let Transport = ({ transport }) => {
  if (transport) return transport;
  else {
  }
};

let Metronome = ({ transport, bpm, onBpmChange }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="Metronome">
      <PlayToggle value={playing} onChange={() => setPlaying(!playing)} />
      <BpmSlider value={bpm} onChange={newBpm => onBpmChange(newBpm)} />
    </div>
  );
};

Metronome = connect(
  state => {
    const { transport, bpm } = state.sequencer;
    return { transport, bpm };
  },
  dispatch => {
    const onBpmChange = newBpm => {
      dispatch(setBpm(newBpm));
    };
    return { onBpmChange };
  }
)(Metronome);

export default Metronome;
