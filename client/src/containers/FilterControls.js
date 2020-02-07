import React from "react";
import { connect } from "react-redux";
import Control from "../uix/Control";
import "./FilterControls.sass";

let FilterControls = ({ synthState, showingCtls }) => {
  return (
    <div className="FilterControls">
      {showingCtls && (
        <>
          <Control label={"cutoff"} value={synthState.filterFreq} />
          <Control label={"Q"} value={synthState.filterRes} />
          <Control
            label={"type"}
            value={
              ["lowpass", "highpass", "bandpass", "notch"][
                synthState.filterType
              ]
            }
          />
        </>
      )}
    </div>
  );
};

FilterControls = connect(state => {
  const { synthState } = state;
  const { showingCtls } = state.utils;
  return { synthState, showingCtls };
})(FilterControls);

export default FilterControls;
