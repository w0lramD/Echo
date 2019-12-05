import React, { useEffect, useRef } from "react";
import Tone from "tone";

let Synth = ({ dispatch, trigger, note, volume, delay }) => {
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

  const _note = useRef(null);
  const _volume = useRef(null);
  const _delay = useRef(null);
  useEffect(() => {
    _note.current = note;
    _volume.current = volume;
    _delay.current = delay;
  }, [delay, note, volume]);

  useEffect(() => {
    if (_note.current && _volume.current) {
      synth.current.volume.value = _volume.current;
      synth.current.triggerAttackRelease(_note.current, 0.01);
    }
  }, [trigger]);

  return <></>;
};

export default Synth;
