import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ScrollReveal from "scrollreveal";
import preset0 from "../presets/default";
import preset1 from "../presets/preset1";
import preset2 from "../presets/preset2";
import "./Score.sass";

const presets = { preset0, preset1, preset2 };

let SC;
let _presetA, _presetB;
let _token = true;

let Score = ({ synthState, onSynthStateChange }) => {
  useEffect(() => {
    if (!SC) {
      SC = ScrollReveal({
        reset: true,
        viewFactor: 0.4,
        beforeReveal: el => {
          if (_token) {
            _presetA = presets[el.className.split(".").join("")];
            _presetA.offsetTop = el.offsetTop;
          } else {
            _presetB = presets[el.className.split(".").join("")];
            _presetB.offsetTop = el.offsetTop;
          }
          _token = !_token;
        }
      });
      for (let preset in presets) SC.reveal("." + preset);
      document.addEventListener("scroll", () => {
        if (_presetA && _presetB) {
          const d = _presetB.offsetTop - _presetA.offsetTop;
          const pos = document.documentElement.scrollTop - _presetA.offsetTop;
          const t = pos / d;
          for (let key in _presetA.synthState) {
            if (key !== "offsetTop") {
              if (key !== "waveform" && key !== "filterType") {
                synthState[key] =
                  _presetA.synthState[key] * (1 - t) +
                  _presetB.synthState[key] * t;
              } else {
                synthState[key] =
                  t > 0.5 ? _presetB.synthState[key] : _presetA.synthState[key];
              }
            }
          }
          onSynthStateChange(synthState);
        }
      });
    }
  }, [synthState, onSynthStateChange]);

  return (
    <div className="Score">
      <div className="preset0"></div>
      <div className="preset1"></div>
      <div className="preset2"></div>
    </div>
  );
};

Score = connect(
  state => {
    const { synthState } = state;
    return { synthState };
  },
  dispatch => {
    const onSynthStateChange = newSynthState => {
      dispatch(actions.setSynthState(newSynthState));
    };
    return { onSynthStateChange };
  }
)(Score);

export default Score;
