import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  createSynth,
  updateSynthState,
  getCurrentStep,
  createBackground
} from "./_helpers";
import "./Synth.sass";

const synth = createSynth();
let _direction, _playing, _steps;

let Synth = props => {
  let { synthState } = props;

  useEffect(() => {
    createBackground(synth);
  }, []);

  useEffect(() => {
    updateSynthState(synth, synthState);
  }, [synthState]);

  let { playing } = props;
  useEffect(() => {
    if (playing) synth.triggerAttack(0.5);
    else synth.triggerRelease(0.5);
  }, [playing]);

  let { direction, steps } = props;
  useEffect(() => {
    _direction = direction;
    _playing = playing;
    _steps = steps;
  }, [direction, playing, steps]);

  let { time } = props;
  useEffect(() => {
    if (_playing) {
      let note = _playing ? getCurrentStep(_steps, _direction, time) : null;
      synth.setNote(note);
    }
  }, [time]);

  return <div className="Synth"></div>;
};

Synth = connect(state => {
  const { synthState } = state;
  const { steps, direction, playing, time } = state.sequencer;
  return { synthState, steps, direction, playing, time };
})(Synth);

export default Synth;
