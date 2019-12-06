export const setBpm = bpm => ({
  type: "SET_BPM",
  bpm
});

export const setBeats = beats => ({
  type: "SET_BEATS",
  beats
});

export const setTrack = (id, steps, direction) => ({
  type: "SET_TRACK",
  id,
  steps,
  direction
});

export const setTrackCurrentStep = (id, currentStep) => ({
  type: "SET_TRACK_CURRENT_STEP",
  id,
  currentStep
});

export const play = () => ({
  type: "PLAY"
});

export const stop = () => ({
  type: "STOP"
});

export const incCurrentTime = () => ({
  type: "INC_CURRENT_TIME"
});
