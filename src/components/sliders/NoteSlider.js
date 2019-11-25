import React from "react";
import { midiToNoteName } from "@tonaljs/midi";
import Slider from "./_Slider";
import "./NoteSlider.css";

function DelaySliderView({ value, focus }) {
  return (
    <div className={(focus && "note-slider focused") || "note-slider"}>
      {midiToNoteName(value)}
    </div>
  );
}

export default function DelaySlider({ onChange }) {
  return (
    <Slider
      min={0}
      max={127}
      step={1}
      defaultValue={48}
      component={DelaySliderView}
      onChange={val => onChange(val)}
    />
  );
}
