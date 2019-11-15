import React, { useState, useEffect, useRef } from "react";
import Toggle from "./Toggle";
import "./Track.css";

export default function Track({ steps, onNext }) {
  const [track, setTrack] = useState(steps);
  const [focusedStep, setFocusedStep] = useState(0);

  const timeline = useRef(null);
  const stepIndex = useRef(0);
  const play = useRef(() => {});
  const stop = useRef(() => {});

  useEffect(() => {
    function next() {
      stepIndex.current = (stepIndex.current + 1) % track.length;
      let current = track[stepIndex.current];
      if (onNext) {
        onNext(current, stepIndex.current);
      }
      setFocusedStep(stepIndex.current);
      timeline.current = setTimeout(next, 250);
    }
    if (timeline.current) {
      clearTimeout(timeline.current);
      next();
    }
    play.current = () => next();
    stop.current = () => clearTimeout(timeline.current);
  }, [onNext, track]);

  return (
    <div className="track-container">
      <Toggle
        labelOnTrue="pause"
        labelOnFalse="play"
        onToggle={status => {
          if (!status) play.current();
          else stop.current();
        }}
      />
      {steps &&
        steps.map((value, i) => (
          <Toggle
            key={i}
            defaultValue={value}
            onToggle={toggleValue => {
              let newTrack = [...track];
              newTrack[i] = !track[i];
              setTrack(newTrack);
            }}
            focused={i === focusedStep}
          />
        ))}
    </div>
  );
}
