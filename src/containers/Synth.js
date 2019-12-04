import Tone from "tone";

export const synth = new Tone.AMSynth({
  oscillator: {
    type: "pulse"
  }
});
const rev = new Tone.Freeverb(0.8, 1000).toMaster();
rev.wet.value = 0.3;
synth.connect(rev);

/*import Tone from "tone";

const synth = new Tone.PolySynth(
  new Tone.AMSynth({
    harmonicity: 3,
    detune: 0,
    oscillator: {
      type: "pulse"
    },
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: 1,
      release: 0.5
    },
    modulation: {
      type: "square"
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  }),
  4
);
const rev = new Tone.Freeverb(0.8, 1000).toMaster();
rev.wet.value = 0.3;
synth.connect(rev);
*/
