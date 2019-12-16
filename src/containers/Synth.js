import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PolySynth, AMSynth, Freeverb } from "tone";

let Synth = () => {
  const rev = useRef(new Freeverb(0.8, 1000).toMaster());
  useEffect(() => {
    rev.current.wet.value = 0.5;
  }, []);

  const synthState = useSelector(state => state.synth);
  const synth = useRef(
    new PolySynth(12, AMSynth, synthState).connect(rev.current)
  );
  useEffect(() => {
    synth.current.set(synthState);
  }, [synthState]);

  const currentStep = useSelector(state => {
    let seq = state.sequencer;
    return {
      note:
        seq.tracks &&
        seq.tracks["note"] &&
        seq.tracks["note"].currentStep &&
        seq.tracks["note"].steps &&
        seq.tracks["note"].steps[seq.tracks["note"].currentStep],
      mod:
        seq.tracks &&
        seq.tracks["mod"] &&
        seq.tracks["mod"].currentStep &&
        seq.tracks["mod"].steps &&
        seq.tracks["mod"].steps[seq.tracks["mod"].currentStep]
    };
  });

  useEffect(() => {
    if (currentStep) {
      if (currentStep.note && Number.isInteger(currentStep.mod)) {
        if (currentStep.mod) synth.current.modulationType = "sine";
        synth.current.triggerAttackRelease(currentStep.note, 0.01);
      }
    }
  }, [currentStep]);

  return <></>;
};

export default Synth;
