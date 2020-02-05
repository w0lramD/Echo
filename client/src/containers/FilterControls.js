import React from "react";
import { connect } from "react-redux";
import Control from "../uix/Control";
import "./FilterControls.sass";

let FilterControls = ({ synthState }) => {
  return (
    <div className="FilterControls">
      <Control label={"cutoff"} value={synthState.filterFreq} />
      <Control label={"Q"} value={synthState.filterRes} />
      <Control
        label={"type"}
        value={
          ["lowpass", "highpass", "bandpass", "notch"][synthState.filterType]
        }
      />
    </div>
  );
};

FilterControls = connect(state => {
  const { synthState } = state;
  return { synthState };
})(FilterControls);

export default FilterControls;
