import React from "react";
import { midiToNoteName } from "@tonaljs/midi";
import Slider from "./_Slider";
import "./NoteSlider.css";

function NoteSliderView({ value, focus }) {
  return (
    <div className={(focus && "NoteSlider focus") || "NoteSlider"}>
      {midiToNoteName(value)}
    </div>
  );
}

export default function NoteSlider({ value, focus, onChange }) {
  return (
    <Slider
      View={NoteSliderView}
      value={value}
      min={0}
      max={127}
      step={1}
      focus={focus}
      onChange={newValue => onChange(newValue)}
    />
  );
}
