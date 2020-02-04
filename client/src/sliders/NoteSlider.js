import React from "react";
import { midiToNoteName, toMidi } from "@tonaljs/midi";
import Slider from "./_Slider";
import "./NoteSlider.sass";

function NoteSliderView({ value, focus }) {
  return (
    <div className={(focus && "NoteSlider focus") || "NoteSlider"}>
      {(Number.isInteger(value) && midiToNoteName(value)) || value}
    </div>
  );
}

export default function NoteSlider({ value, focus, onChange }) {
  return (
    <Slider
      View={NoteSliderView}
      value={toMidi(value)}
      min={0}
      max={127}
      step={1}
      focus={focus}
      onChange={newValue => onChange(midiToNoteName(newValue))}
    />
  );
}
