import React, { useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { setTrack } from "../actions";
import Synth from "./Synth";
import DirectionToggle from "../toggles/DirectionToggle";
import NoteSlider from "../sliders/NoteSlider";
import DelaySlider from "../sliders/DelaySlider";
import "./Track.css";

let Track = ({ dispatch, id, defSteps }) => {
  useEffect(() => {
    dispatch(setTrack(id, defSteps, "→"));
  }, [dispatch, id, defSteps]);

  const playing = useSelector(state => {
    let seq = state.sequencer;
    return seq.playing && seq.playing;
  });

  const steps = useSelector(state => {
    let seq = state.sequencer;
    return seq.tracks && seq.tracks[id] && seq.tracks[id].steps;
  });

  const direction = useSelector(state => {
    let seq = state.sequencer;
    return seq.tracks && seq.tracks[id] && seq.tracks[id].direction;
  });

  const currentTime = useSelector(state => {
    let seq = state.sequencer;
    return seq.currentTime && seq.currentTime;
  });

  const step = useRef(null);
  useEffect(() => {
    if (steps && direction) {
      let stepPos = currentTime % steps.length;
      if (direction === "←") {
        stepPos = steps.length - stepPos - 1;
      } else if (direction === "?") {
        stepPos = Math.floor(Math.random() * steps.length);
      } else if (direction === "↔") {
        stepPos = currentTime % (steps.length * 2);
        if (stepPos >= steps.length) {
          stepPos = steps.length - (stepPos % steps.length) - 1;
        }
      }
      step.current = stepPos;
    }
  }, [currentTime, direction, steps]);

  return (
    <div className="Track">
      <Synth
        trigger={playing && currentTime}
        note={steps && steps[step.current]}
        volume={-6}
      />
      <DirectionToggle
        onChange={direction => dispatch(setTrack(id, steps, direction))}
      />
      {steps &&
        steps.map((value, i) => (
          <NoteSlider
            key={i}
            defaultValue={value}
            onChange={stepValue => {
              let newSteps = [...steps];
              newSteps[i] = stepValue;
              dispatch(setTrack(id, newSteps, direction));
            }}
            focus={i === step.current}
          />
        ))}
      <DelaySlider onChange={() => {}} />
    </div>
  );
};
Track = connect()(Track);

export default Track;
