import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PolySynth, AMSynth, Freeverb } from "tone";

let _synth, _rev;
let Synth = ({ synthState, currentStep }) => {
  useEffect(() => {
    if (!_synth) {
      _rev = new Freeverb(0.8, 1000).toMaster();
      _rev.wet.value = 0.5;
      _synth = new PolySynth(12, AMSynth).connect(_rev);
    }
  }, [synthState]);

  useEffect(() => {
    if (currentStep.modulationType)
      _synth.modulationType = currentStep.modulationType;
    if (currentStep.note) _synth.triggerAttackRelease(currentStep.note, 0.01);
  }, [currentStep]);

  return <></>;
};

Synth = connect(state => {
  const synthState = state.synth;
  const { tracks, time } = state.sequencer;
  return { tracks, time, synthState };
})(Synth);

export default Synth;
