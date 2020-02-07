import * as constants from "../actions/constants";

const utilsActions = (state, action) => {
  switch (action.type) {
    case constants.SET_SHOW_CTLS:
      return { ...state, showingCtls: action.showingCtls };
    default:
      return { ...state };
  }
};
export default utilsActions;
