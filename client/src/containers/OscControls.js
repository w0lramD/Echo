import React from "react";
import { connect } from "react-redux";
import Control from "../uix/Control";
import "./OscControls.sass";

let OscControls = ({ synthState, showingCtls }) => {
  return (
    <div className="OscControls">
      {showingCtls && (
        <>
          <Control label={"detune"} value={synthState.detune} />
          <Control label={"amplitude"} value={synthState.volume} />
          <Control label={"slide"} value={synthState.portamento} />
          <Control
            label={"wave - "}
            value={["sine", "pulse", "tri", "saw"][synthState.waveform]}
          />
        </>
      )}
    </div>
  );
};

OscControls = connect(state => {
  const { synthState } = state;
  const { showingCtls } = state.utils;
  return { synthState, showingCtls };
})(OscControls);

export default OscControls;
