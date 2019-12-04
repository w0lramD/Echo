const sequencerActions = (state, action) => {
  switch (action.type) {
    case "SET_BPM":
      let { bpm } = action;
      return { ...state, bpm };

    case "SET_BEAT":
      let { beat } = action;
      return { ...state, beat };

    case "SET_TRACK":
      let { id, steps, direction } = action;
      let tracks = { ...state.tracks };
      if (!tracks[id]) tracks[id] = {};
      tracks[id].steps = steps;
      tracks[id].direction = direction;
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
