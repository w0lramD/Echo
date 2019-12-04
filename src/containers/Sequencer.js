import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { play, stop, incCurrentTime, setBpm } from "../actions";
import PlayToggle from "../toggles/PlayToggle";
import BpmSlider from "../sliders/BpmSlider";
import "./Sequencer.css";

let timeout;
let Sequencer = ({ dispatch, children }) => {
  const playing = useSelector(state => state.playing && state.playing);
  const bpm = useSelector(state => state.bpm && state.bpm);
  const beats = useSelector(state => state.beats && state.beats);
  useEffect(() => {
    function clock() {
      if (playing) {
        dispatch(incCurrentTime());
        const time = (60 * 1000) / bpm / beats;
        timeout = setTimeout(clock, time);
      }
    }
    if (playing) {
      clearTimeout(timeout);
      timeout = clock();
    } else clearTimeout(timeout);
  }, [playing, bpm, beats, dispatch]);

  return (
    <div className="Sequencer">
      <div className="controls">
        <PlayToggle
          onChange={playing => {
            if (playing) dispatch(play());
            else dispatch(stop());
          }}
        />
        <BpmSlider onChange={bpm => dispatch(setBpm(bpm))} />
      </div>
      {children}
    </div>
  );
};
Sequencer = connect()(Sequencer);

export default Sequencer;
