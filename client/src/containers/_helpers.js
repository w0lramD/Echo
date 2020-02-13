import { MonoSynth, Compressor, FeedbackDelay, Freeverb, Meter } from "tone";
import p5 from "p5";

export const getCurrentStep = (steps, direction, time) => {
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

export const getCurrentStepIndex = (steps, direction, time) => {
  if (steps) {
    switch (direction) {
      //forwards
      case 0:
        return time % steps.length;
      //backwards
      case 1:
        let fwdStep = time % steps.length;
        return steps.length - fwdStep - 1;
      //forwards-backwards
      case 2:
        let fwdStep2 = time % (steps.length * 2);
        if (fwdStep2 >= steps.length)
          return steps.length - (fwdStep2 % steps.length) - 1;
        else return fwdStep2;
      //random
      case 3:
        return Math.floor(Math.random() * steps.length);
      default:
        return null;
    }
  }
};

export const createSynth = () => {
  let synth = new MonoSynth({
    filter: {
      rolloff: -24
    },
    filterEnvelope: {
      sustain: 0.1
    }
  });
  synth.limiter = new Compressor({
    //limiter
    ratio: 8,
    threshold: -32,
    release: 0.25,
    attack: 0.0045,
    knee: 0
  }).toMaster();
  synth.rev = new Freeverb(0.8, 500).connect(synth.limiter);
  synth.rev.wet.value = 0.2;
  synth.rms = new Meter();
  synth.echo1 = new FeedbackDelay("1n", 0.3).connect(synth.rev);
  synth.echo2 = new FeedbackDelay("2n", 0.3).connect(synth.rev);
  synth.echo3 = new FeedbackDelay("3n", 0.3).connect(synth.rev);
  synth.echo4 = new FeedbackDelay("4n", 0.3).connect(synth.rev);
  synth
    .connect(synth.echo1)
    .connect(synth.echo2)
    .connect(synth.echo3)
    .connect(synth.echo4)
    .connect(synth.rev)
    .connect(synth.rms);
  return synth;
};

export const updateSynthState = (synth, synthState) => {
  if (synth && synthState) {
    synth.portamento = synthState.portamento;
    synth.volume.value = synthState.volume;
    synth.detune.value = synthState.detune;
    synth.oscillator.type = ["sine", "square", "triangle", "sawtooth"][
      synthState.waveform
    ];
    synth.filterEnvelope.baseFrequency = synthState.filterFreq;
    synth.filter.Q.value = synthState.filterRes;
    synth.filter.type = ["lowpass", "highpass", "bandpass", "notch"][
      synthState.filterType
    ];
    synth.echo1.wet.value = synthState.echo1;
    synth.echo2.wet.value = synthState.echo2;
    synth.echo3.wet.value = synthState.echo3;
    synth.echo4.wet.value = synthState.echo4;
  }
};

//background
export const createBackground = (synth, divSelector) => {
  let p5div = document.querySelector(".Synth");
  let w, h, freq;
  let p5sketch = p5 => {
    p5.setup = () => {
      w = p5div.clientWidth;
      h = p5div.clientHeight;
      p5.noStroke();
      p5.createCanvas(w, h);
    };
    p5.windowResized = () => {
      w = p5div.clientWidth;
      h = p5div.clientHeight;
      p5.resizeCanvas(w, h);
    };
    p5.draw = () => {
      if (freq === synth.frequency.value) return;
      freq = synth.frequency.value;
      p5.fill(p5.random(255), p5.random(255), p5.random(255));
      p5.clear();
      switch (p5.floor(p5.random(3))) {
        case 0:
          p5.triangle(
            p5.random(w / 2 - w / 6, w / 2),
            h / 2 + h / 6,
            p5.random(w / 2 - w / 6, w / 2 + w / 6),
            h / 2 - h / 6,
            p5.random(w / 2 - w / 6, w / 2 + w / 6),
            p5.random(h / 2 - h / 6, h / 2 + h / 6)
          );
          return;
        case 1:
          p5.quad(
            p5.random(w / 2 - w / 6, w / 2),
            h / 2 + h / 6,
            p5.random(w / 2 - w / 6, w / 2 + w / 6),
            h / 2 - h / 6,
            p5.random(w / 2 - w / 6, w / 2 + w / 6),
            p5.random(h / 2 - h / 6, h / 2 + h / 6),
            p5.random(w / 2 - w / 6, w / 2 + w / 6),
            p5.random(h / 2 + h / 6, h / 2 + h / 6)
          );
          return;
        default:
          return;
      }
    };
  };
  //P5.js sketch instance
  new p5(p5sketch, p5div);
};
