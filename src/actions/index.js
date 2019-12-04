export const setBpm = bpm => ({
  type: "SET_BPM",
  bpm
});

export const setBeat = beat => ({
  type: "SET_BEAT",
  beat
});

export const setTrack = (id, steps, direction) => ({
  type: "SET_TRACK",
  id,
  steps,
  direction
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
