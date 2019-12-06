import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Tone from "tone";

let Synth = () => {
  const synth = useRef(null);
  useEffect(() => {
    synth.current = new Tone.PolySynth(12, Tone.AMSynth, {
      harmonicity: 3,
      detune: 0,
      oscillator: {
        type: "pulse"
      },
      envelope: {
        attack: 0.1,
        decay: 0.01,
        sustain: 1,
        release: 0.2
      },
      modulation: {
        type: "sine"
      },
      modulationEnvelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1
      }
    });
    const rev = new Tone.Freeverb(0.8, 1000).toMaster();
    rev.wet.value = 0.5;
    synth.current.connect(rev);
  }, []);

  const current = useSelector(state => {
    let seq = state.sequencer;
    return {
      note:
        seq.tracks &&
        seq.tracks["note"].currentStep &&
        seq.tracks["note"] &&
        seq.tracks["note"][seq.tracks["note"].currentStep],
      waveform:
        seq.tracks &&
        seq.tracks["wf"].currentStep &&
        seq.tracks["wf"] &&
        seq.tracks["wf"][seq.tracks["wf"].currentStep]
    };
  });

  useEffect(() => {
    if (current) {
      console.log(current);
      if (current.note && current.waveform) {
        synth.current.modulationType = current.waveform;
        synth.current.triggerAttackRelease(current.note, 0.01);
      }
    }
  }, [current]);

  return <></>;
};

export default Synth;
