import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { play, stop, incCurrentTime, setBpm, setBeats } from "../actions";
import PlayToggle from "../toggles/PlayToggle";
import BpmSlider from "../sliders/BpmSlider";
import "./Sequencer.css";

let timeout;
let Sequencer = ({ dispatch, children, defBpm, defBeats }) => {
  useEffect(() => {
    dispatch(setBpm(defBpm));
    dispatch(setBeats(defBeats));
  }, [defBeats, defBpm, dispatch]);

  const playing = useSelector(state => state.sequencer.playing);
  const bpm = useSelector(state => state.sequencer.bpm);
  const beats = useSelector(state => state.sequencer.beats);
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
            console.log(playing);
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
