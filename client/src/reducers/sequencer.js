import * as constants from "../actions/constants";

const sequencerActions = (state, action) => {
  switch (action.type) {
    case constants.SET_BPM:
      return { ...state, bpm: action.bpm };

    case constants.SET_STEPS:
      return { ...state, steps: action.steps };

    case constants.SET_DIRECTION:
      return { ...state, direction: action.direction };

    case constants.SET_TIME:
      return { ...state, time: action.time };

    case constants.SET_PLAYING:
      return { ...state, playing: action.playing };

    case constants.SET_SEQUENCER_STATE:
      return { ...state, sequencer: action.sequencer };

    default:
      return { ...state };
  }
};
export default sequencerActions;
