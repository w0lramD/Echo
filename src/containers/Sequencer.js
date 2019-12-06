import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { play, stop, incCurrentTime, setBpm } from "../actions";
import PlayToggle from "../toggles/PlayToggle";
import BpmSlider from "../sliders/BpmSlider";
import "./Sequencer.css";

let timeout, _bpm, _beats;
let Sequencer = ({ dispatch, children }) => {
  const playing = useSelector(state => state.sequencer.playing);
  const bpm = useSelector(state => {
    _bpm = state.sequencer.bpm;
    return _bpm;
  });
  const beats = useSelector(state => {
    _beats = state.sequencer.beats;
    return _beats;
  });

  useEffect(() => {
    function clock() {
      if (playing) {
        dispatch(incCurrentTime());
        const time = (60 * 1000) / _bpm / _beats;
        timeout = setTimeout(clock, time);
      }
    }
    if (playing) {
      clearTimeout(timeout);
      timeout = clock();
    } else clearTimeout(timeout);
  }, [playing, dispatch]);

  return (
    <div className="Sequencer">
      <div className="controls">
        <PlayToggle
          onChange={playing => {
            if (playing) dispatch(play());
            else dispatch(stop());
          }}
        />
        {beats}/{beats}
        <BpmSlider
          defaultValue={bpm}
          onChange={newBpm => dispatch(setBpm(newBpm))}
        />
      </div>
      {children}
    </div>
  );
};
Sequencer = connect()(Sequencer);

export default Sequencer;
