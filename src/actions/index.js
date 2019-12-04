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

export const play = () => ({
  type: "PLAY"
});

export const stop = () => ({
  type: "STOP"
});

export const incCurrentTime = () => ({
  type: "INC_CURRENT_TIME"
});
