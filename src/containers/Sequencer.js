import React, { useState } from "react";
import { connect } from "react-redux";
import { setBpm } from "../actions";
import PlayToggle from "../toggles/PlayToggle";
import BpmSlider from "../sliders/BpmSlider";
import "./Sequencer.css";

let Sequencer = ({ children, tracks, bpm, onBpmChange }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="Sequencer">
      <div className="controls">
        <PlayToggle value={playing} onChange={() => setPlaying(!playing)} />
        <BpmSlider value={bpm} onChange={newBpm => onBpmChange(newBpm)} />
      </div>
      {children}
    </div>
  );
};

Sequencer = connect(
  state => {
    const { bpm } = state.sequencer;
    return { bpm };
  },
  dispatch => {
    const onBpmChange = newBpm => {
      dispatch(setBpm(newBpm));
    };
    return { onBpmChange };
  }
)(Sequencer);

export default Sequencer;
