import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MonoSynth, Delay, Freeverb } from "tone";

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

let _synth, _rev, _delay;
let _direction, _playing, _steps;
let Synth = ({ synthState, playing, steps, direction, time }) => {
  useEffect(() => {
    if (!_synth) {
      _rev = new Freeverb(0.8, 500).toMaster();
      _rev.wet.value = 0.2;
      _delay = new Delay(0, 10);
      _synth = new MonoSynth().connect(_delay);
      _delay.connect(_rev);
      _synth.connect(_rev);
    }
  }, []);

  useEffect(() => {
    _direction = direction;
    _playing = playing;
    _steps = steps;
  }, [direction, playing, steps]);

  useEffect(() => {
    if (_playing) {
      let note = getCurrentStep(_steps, _direction, time);
      console.log(note);
      _synth.triggerAttackRelease(note, 0.1);
    }
  }, [time]);

  return <></>;
};

Synth = connect(state => {
  const synthState = state.synth;
  const { steps, direction, playing, time } = state.sequencer;
  return { steps, direction, playing, time, synthState };
})(Synth);

export default Synth;
