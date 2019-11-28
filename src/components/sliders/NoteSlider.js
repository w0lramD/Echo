import React from "react";
import { midiToNoteName } from "@tonaljs/midi";
import Slider from "./_Slider";
import "./NoteSlider.css";

function NoteSliderView({ defaultValue, focus }) {
  return (
    <div className={(focus && "NoteSlider focus") || "NoteSlider"}>
      {midiToNoteName(defaultValue)}
    </div>
  );
}

export default function NoteSlider({ defaultValue, focus, onChange }) {
  return (
    <Slider
      min={0}
      max={127}
      step={1}
      defaultValue={defaultValue}
      focus={focus}
      component={NoteSliderView}
      onChange={val => onChange(val)}
    />
  );
}
