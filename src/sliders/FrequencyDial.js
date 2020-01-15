import React from "react";
import Slider from "./_Slider";
import "./FrequencyDial.css";

function FrequencyDialView({ value, focus }) {
  return (
    <div className={(focus && "FrequencyDial focus") || "FrequencyDial"}>
      BPM {value}
    </div>
  );
}

export default function FrequencyDial({ value, focus, onChange }) {
  return (
    <Slider
      View={FrequencyDialView}
      value={value}
      min={20}
      max={250}
      step={1}
      focus={focus}
      onChange={newValue => onChange(newValue)}
    />
  );
}
