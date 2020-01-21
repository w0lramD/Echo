import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentStep } from "./Utils";
import { setSynthState } from "../actions";
import { MonoSynth, Delay, Freeverb } from "tone";
import NumberSlider from "../sliders/NumberSlider";
import IconToggle from "../toggles/IconToggle";
import "./Synth.css";

let _synth, _rev, _delay;
let _direction, _playing, _steps;

let Synth = props => {
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

  let { direction, playing, steps } = props;
  useEffect(() => {
    _direction = direction;
    _playing = playing;
    _steps = steps;
  }, [direction, playing, steps]);

  useEffect(() => {
    if (playing) _synth.triggerAttack(0, 0.5);
    else _synth.triggerRelease(0.5);
  }, [playing]);

  let { time } = props;
  useEffect(() => {
    if (_playing) {
      let note = _playing ? getCurrentStep(_steps, _direction, time) : null;
      _synth.setNote(note);
    }
  }, [time]);

  let { synthState, onSynthStateChange } = props;
  const updateSynthState = () => {
    if (_synth && synthState) {
      _synth.portamento = synthState.portamento;
      _synth.volume.value = synthState.volume;
      _synth.detune.value = synthState.detune;
      _synth.oscillator.type = ["sine", "square", "triangle", "sawtooth"][
        synthState.waveform
      ];
    }
    onSynthStateChange(synthState);
  };
  useEffect(updateSynthState, []);

  return (
    <div className="Synth">
      <div className="osc-controls">
        <NumberSlider
          value={synthState.detune}
          label={"Detune"}
          min={-100}
          max={100}
          step={1}
          onChange={value => {
            synthState.detune = value;
            updateSynthState();
          }}
        />
        <NumberSlider
          value={synthState.volume}
          label={"Level"}
          min={-64}
          max={0}
          step={1}
          onChange={value => {
            synthState.volume = value;
            updateSynthState();
          }}
        />
        <NumberSlider
          value={synthState.portamento}
          label={"Portamento"}
          min={0}
          max={1}
          step={0.01}
          onChange={value => {
            synthState.portamento = value;
            updateSynthState();
          }}
        />
        <IconToggle
          value={synthState.waveform}
          icons={["sine", "square", "triangle", "sawtooth"]}
          onChange={value => {
            synthState.waveform = value;
            updateSynthState();
          }}
        />
      </div>
    </div>
  );
};

Synth = connect(
  state => {
    const { synthState } = state;
    const { steps, direction, playing, time } = state.sequencer;
    return { steps, direction, playing, time, synthState };
  },
  dispatch => {
    const onSynthStateChange = newSynthState => {
      dispatch(setSynthState(newSynthState));
    };
    return { onSynthStateChange };
  }
)(Synth);

export default Synth;
