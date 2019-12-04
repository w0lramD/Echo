import { combineReducers } from "redux";
import sequencerActions from "./sequencer";
import synthActions from "./synth";

export default combineReducers({
  synthActions,
  sequencerActions
});
