import React from "react";
import Slider from "./_Slider";
import "./NumberSlider.css";

function NumberSliderView({ value, label, focus }) {
  return (
    <div className={(focus && "NumberSlider focus") || "NumberSlider"}>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
}

export default function NumberSlider(props) {
  return (
    <Slider
      View={NumberSliderView}
      label={props.label}
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      focus={props.focus}
      onChange={newValue => props.onChange(newValue)}
    />
  );
}
