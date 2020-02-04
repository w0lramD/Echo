import React from "react";
import { connect } from "react-redux";
import { setSynthState } from "../actions";
import NumberSlider from "../sliders/NumberSlider";
import TextToggle from "../toggles/TextToggle";
import "./OscControls.sass";

let OscControls = ({ synthState, onSynthStateChange }) => {
  return (
    <div className="OscControls">
      <h1>Oscillator</h1>
      <NumberSlider
        label={"detune"}
        value={synthState.detune}
        min={-100}
        max={100}
        step={1}
        onChange={value => {
          synthState.detune = value;
          onSynthStateChange();
        }}
      />
      <NumberSlider
        label={"level"}
        value={synthState.volume}
        min={-64}
        max={0}
        step={1}
        onChange={value => {
          synthState.volume = value;
          onSynthStateChange();
        }}
      />
      <NumberSlider
        label={"slide"}
        value={synthState.portamento}
        min={0}
        max={1}
        step={0.1}
        onChange={value => {
          synthState.portamento = value;
          onSynthStateChange();
        }}
      />
      <TextToggle
        label={"wave"}
        value={synthState.waveform}
        options={["sine", "square", "triangle", "sawtooth"]}
        onChange={value => {
          synthState.waveform = value;
          onSynthStateChange();
        }}
      />
    </div>
  );
};

OscControls = connect(
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
)(OscControls);

export default OscControls;
