let playing = false;
let currentTime = 0;
let bpm = 120;
let beats = 4;
let timeout = null;

const clock = () => {
  if (playing) {
    currentTime += 1;
    const time = (60 * 1000) / bpm / beats;
    return setTimeout(clock, time);
  } else return null;
};

const sequencerActions = (state, action) => {
  switch (action.type) {
    case "PLAY":
      if (!playing) {
        playing = true;
        timeout = clock();
      }
      return { ...state, playing, currentTime, bpm, beats };

    case "STOP":
      if (playing) {
        playing = false;
        clearTimeout(timeout);
        currentTime = 0;
      }
      return { ...state, playing, currentTime };

    case "STOP":
      if (playing) {
        playing = false;
        clearTimeout(timeout);
        currentTime = 0;
      }
      return { ...state, playing, currentTime };

    default:
      return { ...state };
  }
};
export default sequencerActions;
