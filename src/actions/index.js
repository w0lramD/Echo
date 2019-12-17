import * as constants from "./constants";

export const setBpm = bpm => ({
  type: constants.SET_BPM,
  bpm
});

export const setSteps = (id, steps) => ({
  type: constants.SET_STEPS,
  id,
  steps
});

export const setDirection = (id, direction) => ({
  type: constants.SET_DIRECTION,
  id,
  direction
});

export const setTime = time => ({
  type: constants.SET_TIME,
  time
});
