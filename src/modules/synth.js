import Tone from "tone";

export const synth = new Tone.AMSynth({
  oscillator: {
    type: "pulse"
  }
});
const rev = new Tone.Freeverb(0.8, 1000).toMaster();
rev.wet.value = 0.3;
synth.connect(rev);
