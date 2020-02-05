import React from "react";
import { connect } from "react-redux";
import Control from "../uix/Control";
import "./TempoControls.sass";

let Sequencer = ({ bpm }) => {
  return (
    <div className="TempoControls">
      <Control label="BPM" value={bpm} />
    </div>
  );
};

Sequencer = connect(state => {
  const { bpm } = state.sequencer;
  return { bpm };
})(Sequencer);

export default Sequencer;
