import React from "react";
import { connect } from "react-redux";
import { setSynthState } from "../actions";
import NumberSlider from "../sliders/NumberSlider";
import TextToggle from "../toggles/TextToggle";
import "./FilterControls.sass";

let FilterControls = ({ synthState, onSynthStateChange }) => {
  return (
    <div className="FilterControls">
      <h1>Filter</h1>
      <NumberSlider
        label={"cutoff"}
        value={synthState.filterFreq}
        min={20}
        max={22000}
        step={100}
        onChange={value => {
          synthState.filterFreq = value;
          onSynthStateChange();
        }}
      />
      <NumberSlider
        label={"Q"}
        value={synthState.filterRes}
        min={0}
        max={10}
        step={0.1}
        onChange={value => {
          synthState.filterRes = value;
          onSynthStateChange();
        }}
      />
      <TextToggle
        label={"type"}
        value={synthState.filterType}
        options={["lowpass", "highpass", "bandpass", "notch"]}
        onChange={value => {
          synthState.filterType = value;
          onSynthStateChange();
        }}
      />
    </div>
  );
};

FilterControls = connect(
  state => {
    const { synthState } = state;
    return { synthState };
  },
  dispatch => {
    const onSynthStateChange = newSynthState => {
      dispatch(setSynthState(newSynthState));
    };
    return { onSynthStateChange };
  }
)(FilterControls);

export default FilterControls;
