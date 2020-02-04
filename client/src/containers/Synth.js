import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentStep, createSynth, updateSynthState } from "./_helpers";

const synth = createSynth();
let _direction, _playing, _steps;

let Synth = props => {
  let { synthState } = props;
  useEffect(() => {
    updateSynthState(synth, synthState);
  }, [synthState]);

  let { playing } = props;
  useEffect(() => {
    if (playing) synth.triggerAttack(0, 0.1);
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

  return <></>;
};

Synth = connect(state => {
  const { synthState } = state;
  const { steps, direction, playing, time } = state.sequencer;
  return { synthState, steps, direction, playing, time };
})(Synth);

export default Synth;
