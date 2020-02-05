import * as constants from "../actions/constants";

const synthActions = (state, action) => {
  switch (action.type) {
    case constants.SET_SYNTH_STATE:
      return { ...action.synthState };

    default:
      return { ...state };
  }
};
export default synthActions;
