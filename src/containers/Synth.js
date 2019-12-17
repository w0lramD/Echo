import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PolySynth, AMSynth, Freeverb } from "tone";

const getCurrentStep = (steps, direction, time) => {
  if (steps) {
    switch (direction) {
      //forwards
      case 0:
        return steps[time % steps.length];
      //backwards
      case 1:
        let fwdStep = time % steps.length;
        return steps[steps.length - fwdStep - 1];
      //forwards-backwards
      case 2:
        let fwdStep2 = time % (steps.length * 2);
        if (fwdStep2 >= steps.length)
          return steps[steps.length - (fwdStep2 % steps.length) - 1];
        else return steps[fwdStep2];
      //random
      case 3:
        return steps[Math.floor(Math.random() * steps.length)];
      default:
        return null;
    }
  }
};

let _synth, _rev, _tracks;
let Synth = ({ synthState, playing, tracks, time }) => {
  useEffect(() => {
    if (!_synth) {
      _rev = new Freeverb(0.8, 1000).toMaster();
      _rev.wet.value = 0.2;
      _synth = new PolySynth(12, AMSynth).connect(_rev);
    }
  }, [synthState]);

  useEffect(() => {
    _tracks = tracks;
  }, [tracks]);

  useEffect(() => {
    if (playing && _tracks) {
      if (_tracks.modulationType)
        _synth.modulationType = getCurrentStep(
          _tracks.modulationType.steps,
          _tracks.modulationType.direction,
          time
        );
      if (_tracks.note) {
        let note = getCurrentStep(
          _tracks.note.steps,
          _tracks.note.direction,
          time
        );
        _synth.triggerAttackRelease(note, 0.1);
      }
    }
  }, [playing, time]);

  return <></>;
};

Synth = connect(state => {
  const synthState = state.synth;
  const { tracks, time } = state.sequencer;
  return { tracks, time, synthState };
})(Synth);

export default Synth;
