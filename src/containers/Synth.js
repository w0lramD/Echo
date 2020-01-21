import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentStep } from "./Utils";
import { setSynthState } from "../actions";
import { MonoSynth, Compressor, FeedbackDelay, Freeverb } from "tone";
import NumberSlider from "../sliders/NumberSlider";
import TextToggle from "../toggles/TextToggle";
import "./Synth.css";

let _limiter, _synth, _rev, _echo1, _echo2, _echo3, _echo4;
let _direction, _playing, _steps;

let Synth = props => {
  useEffect(() => {
    if (!_synth) {
      _limiter = new Compressor({
        //limiter
        ratio: 8,
        threshold: -32,
        release: 0.25,
        attack: 0.0045,
        knee: 0
      }).toMaster();
      _rev = new Freeverb(0.8, 500).connect(_limiter);
      _rev.wet.value = 0.2;
      _echo1 = new FeedbackDelay("1n", 0).connect(_rev);
      _echo2 = new FeedbackDelay("2n", 0).connect(_rev);
      _echo3 = new FeedbackDelay("3n", 0).connect(_rev);
      _echo4 = new FeedbackDelay("4n", 0).connect(_rev);
      _synth = new MonoSynth({
        filter: {
          rolloff: -24
        },
        filterEnvelope: {
          sustain: 0.1
        }
      })
        .connect(_echo1)
        .connect(_echo2)
        .connect(_echo3)
        .connect(_echo4);
    }
  }, []);

  let { synthState, onSynthStateChange } = props;
  const updateSynthState = () => {
    if (_synth && synthState) {
      _synth.portamento = synthState.portamento;
      _synth.volume.value = synthState.volume;
      _synth.detune.value = synthState.detune;
      _synth.oscillator.type = ["sine", "square", "triangle", "sawtooth"][
        synthState.waveform
      ];
      _synth.filterEnvelope.baseFrequency = synthState.filterFreq;
      _synth.filter.Q.value = synthState.filterRes;
      _synth.filter.type = ["lowpass", "highpass", "bandpass", "notch"][
        synthState.filterType
      ];
      _echo1.wet.value = synthState.echo1;
      _echo2.wet.value = synthState.echo2;
      _echo3.wet.value = synthState.echo3;
      _echo4.wet.value = synthState.echo4;
    }
    onSynthStateChange(synthState);
  };
  useEffect(updateSynthState, []);

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

  return (
    <div className="Synth">
      <div className="osc-controls">
        <NumberSlider
          label={"detune"}
          value={synthState.detune}
          min={-100}
          max={100}
          step={1}
          onChange={value => {
            synthState.detune = value;
            updateSynthState();
          }}
        />
        <NumberSlider
          label={"level"}
          value={synthState.volume}
          min={-64}
          max={0}
          step={1}
          onChange={value => {
            synthState.volume = value;
            updateSynthState();
          }}
        />
        <NumberSlider
          label={"slide"}
          value={synthState.portamento}
          min={0}
          max={1}
          step={0.01}
          onChange={value => {
            synthState.portamento = value;
            updateSynthState();
          }}
        />
        <TextToggle
          label={"wave"}
          value={synthState.waveform}
          options={["sine", "square", "triangle", "sawtooth"]}
          onChange={value => {
            synthState.waveform = value;
            updateSynthState();
          }}
        />
      </div>
      <div className="filter-controls">
        <NumberSlider
          label={"cutoff"}
          value={synthState.filterFreq}
          min={20}
          max={22000}
          step={100}
          onChange={value => {
            synthState.filterFreq = value;
            updateSynthState();
          }}
        />
        <NumberSlider
          label={"Q"}
          value={synthState.filterRes}
          min={0}
          max={10}
          step={0.1}
          onChange={value => {
            synthState.filterRes = value;
            updateSynthState();
          }}
        />
        <TextToggle
          label={"type"}
          value={synthState.filterType}
          options={["lowpass", "highpass", "bandpass", "notch"]}
          onChange={value => {
            synthState.filterType = value;
            updateSynthState();
          }}
        />
      </div>
      <div className="echo-controls">
        <NumberSlider
          label={"echo1"}
          value={synthState.echo1}
          min={0}
          max={1}
          step={0.1}
          onChange={value => {
            synthState.echo1 = value;
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
