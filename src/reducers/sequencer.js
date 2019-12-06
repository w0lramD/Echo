const sequencerActions = (state, action) => {
  let tracks;
  switch (action.type) {
    case "SET_BPM":
      return { ...state, bpm: action.bpm };

    case "SET_BEATS":
      return { ...state, beats: action.beats };

    case "SET_TRACK":
      tracks = { ...state.tracks };
      if (!tracks[action.id]) tracks[action.id] = {};
      tracks[action.id].steps = action.steps;
      tracks[action.id].direction = action.direction;
      tracks[action.id].currentStep = null;
      return { ...state, tracks };

    case "SET_TRACK_CURRENT_STEP":
      tracks = { ...state.tracks };
      if (tracks[action.id]) {
        tracks[action.id].currentStep = action.currentStep;
      }
      return { ...state, tracks };

    case "PLAY":
      return { ...state, playing: true, currentTime: 0 };

    case "STOP":
      return { ...state, playing: false };

    case "INC_CURRENT_TIME":
      return { ...state, currentTime: state.currentTime + 1 || 0 };

    default:
      return { ...state };
  }
};
export default sequencerActions;
