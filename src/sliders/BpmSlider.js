import React from "react";
import Slider from "./_Slider";
import "./BpmSlider.css";

function BpmSliderView({ value, focus }) {
  return (
    <div className={(focus && "BpmSlider focus") || "BpmSlider"}>
      BPM {value}
    </div>
  );
}

export default function BpmSlider({ value, focus, onChange }) {
  return (
    <Slider
      View={BpmSliderView}
      value={value}
      min={20}
      max={250}
      step={1}
      focus={focus}
      onChange={newValue => onChange(newValue)}
    />
  );
}
