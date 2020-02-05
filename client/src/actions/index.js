import * as constants from "./constants";

export const setBpm = bpm => ({
  type: constants.SET_BPM,
  bpm
});

export const setSteps = steps => ({
  type: constants.SET_STEPS,
  steps
});

export const setDirection = direction => ({
  type: constants.SET_DIRECTION,
  direction
});

export const setTime = time => ({
  type: constants.SET_TIME,
  time
});

export const setPlaying = playing => ({
  type: constants.SET_PLAYING,
  playing
});

export const setSynthState = synthState => ({
  type: constants.SET_SYNTH_STATE,
  synthState
});

export const setSequencerState = sequencerState => ({
  type: constants.SET_SEQUENCER_STATE,
  sequencerState
});
