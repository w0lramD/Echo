import { combineReducers } from "redux";
import sequencer from "./sequencer";
import synthState from "./synth";

export default combineReducers({
  synthState,
  sequencer
});
