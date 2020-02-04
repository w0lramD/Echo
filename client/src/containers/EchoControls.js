import React from "react";
import { connect } from "react-redux";
import { setSynthState } from "../actions";
import NumberSlider from "../sliders/NumberSlider";
import "./EchoControls.css";

let EchoControls = ({ synthState, onSynthStateChange }) => {
  return (
    <div className="EchoControls">
      <NumberSlider
        label={"echo1"}
        value={synthState.echo1}
        min={0}
        max={1}
        step={0.1}
        onChange={value => {
          synthState.echo1 = value;
          onSynthStateChange();
        }}
      />
      <NumberSlider
        label={"echo2"}
        value={synthState.echo2}
        min={0}
        max={1}
        step={0.1}
        onChange={value => {
          synthState.echo2 = value;
          onSynthStateChange();
        }}
      />
      <NumberSlider
        label={"echo3"}
        value={synthState.echo3}
        min={0}
        max={1}
        step={0.1}
        onChange={value => {
          synthState.echo3 = value;
          onSynthStateChange();
        }}
      />
      <NumberSlider
        label={"echo4"}
        value={synthState.echo4}
        min={0}
        max={1}
        step={0.1}
        onChange={value => {
          synthState.echo4 = value;
          onSynthStateChange();
        }}
      />
    </div>
  );
};

EchoControls = connect(
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
)(EchoControls);

export default EchoControls;
