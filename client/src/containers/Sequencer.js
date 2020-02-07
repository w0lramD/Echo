import React from "react";
import { connect } from "react-redux";
import { getCurrentStepIndex } from "./_helpers";
import Note from "../uix/Note";
import "./Sequencer.sass";

let Sequencer = props => {
  let { playing } = props;
  let { time } = props;
  let { steps, direction } = props;
  let { showingCtls } = props;
  return (
    <div className="Sequencer">
      {showingCtls && (
        <div className="steps">
          {steps &&
            steps.map((value, i) => (
              <Note
                key={i}
                value={value}
                focus={
                  playing
                    ? i === getCurrentStepIndex(steps, direction, time)
                    : null
                }
              />
            ))}
        </div>
      )}
    </div>
  );
};

Sequencer = connect(state => {
  const { steps, direction, playing, time, bpm } = state.sequencer;
  const { showingCtls } = state.utils;
  return { steps, direction, playing, time, bpm, showingCtls };
})(Sequencer);

export default Sequencer;
