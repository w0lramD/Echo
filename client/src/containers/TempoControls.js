import React from "react";
import { connect } from "react-redux";
import Control from "../uix/Control";
import "./TempoControls.sass";

let Sequencer = ({ bpm, showingCtls }) => {
  return (
    <div className="TempoControls">
      {showingCtls && <Control label="BPM" value={bpm} />}
    </div>
  );
};

Sequencer = connect(state => {
  const { bpm } = state.sequencer;
  const { showingCtls } = state.utils;
  return { bpm, showingCtls };
})(Sequencer);

export default Sequencer;
