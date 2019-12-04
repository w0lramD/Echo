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

export default function BpmSlider({ defaultValue, focus, onChange }) {
  return (
    <Slider
      min={20}
      max={250}
      step={1}
      defaultValue={defaultValue}
      focus={focus}
      component={BpmSliderView}
      onChange={val => onChange(val)}
    />
  );
}
