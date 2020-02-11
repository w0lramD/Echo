import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ScrollReveal from "scrollreveal";
import "./Score.sass";

let SC;
let _presetA, _presetB;
let _token = true;

let Score = props => {
  let { presets } = props;
  let { sequencer, onSequencerChange } = props;
  let { synthState, onSynthStateChange } = props;
  useEffect(() => {
    if (!SC) {
      //load sequence on vertical scroll
      SC = ScrollReveal({
        reset: true,
        viewFactor: 0.0,
        beforeReveal: el => {
          if (_token) {
            _presetA = presets[el.className.replace("preset", "")];
            _presetA.offsetTop = el.offsetTop;
            onSequencerChange(_presetA.sequencer);
          } else {
            _presetB = presets[el.className.replace("preset", "")];
            _presetB.offsetTop = el.offsetTop;
            onSequencerChange(_presetB.sequencer);
          }
          if (!_presetB) {
            _presetB = presets[1];
            _presetB.offsetTop = el.offsetHeight;
          }
          _token = !_token;
        }
      });
      for (let i = 0; i < presets.length; i++) SC.reveal(".preset" + i);
      //linear interpolation between synth status a and b
      document.addEventListener("scroll", () => {
        if (_presetA && _presetB) {
          const d = _presetB.offsetTop - _presetA.offsetTop;
          const pos = document.documentElement.scrollTop - _presetA.offsetTop;
          const t = pos / d;
          for (let key in _presetA.synthState) {
            if (key !== "offsetTop") {
              if (key !== "waveform" && key !== "filterType") {
                let value =
                  Math.floor(
                    (_presetA.synthState[key] * (1 - t) +
                      _presetB.synthState[key] * t) *
                      100
                  ) / 100;
                if (!Number.isNaN(value)) synthState[key] = value;
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
  }, [synthState, onSynthStateChange, sequencer, onSequencerChange, presets]);

  return (
    <div className="Score">
      {presets &&
        Object.keys(presets).map((preset, i) => (
          <div
            key={i}
            className={"preset" + i}
            style={{ top: i * 10000 + "vh" }}
          ></div>
        ))}
    </div>
  );
};

Score = connect(
  state => {
    const { synthState, sequencer } = state;
    return { synthState, sequencer };
  },
  dispatch => {
    const onSynthStateChange = newSynthState => {
      dispatch(actions.setSynthState(newSynthState));
    };
    const onSequencerChange = newSequence => {
      for (let key in newSequence) {
        if (key === "steps") {
          dispatch(actions.setSteps(newSequence.steps));
        } else if (key === "direction") {
          dispatch(actions.setDirection(newSequence.direction));
        } else if (key === "bpm") {
          dispatch(actions.setBpm(newSequence.bpm));
        }
      }
    };
    return {
      onSynthStateChange,
      onSequencerChange
    };
  }
)(Score);

export default Score;
