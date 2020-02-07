import { combineReducers } from "redux";
import sequencer from "./sequencer";
import synthState from "./synth";
import utils from "./utils";

export default combineReducers({
  synthState,
  sequencer,
  utils
});
