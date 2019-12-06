import React from "react";
import Toggle from "./_Toggle";
import "./WaveformToggle.css";

function WaveformToggleView({ values, currentValue, focus }) {
  return (
    <div className={(focus && "WaveformToggle focus") || "WaveformToggle"}>
      <img
        src={"/icons/" + values[currentValue] + ".svg"}
        alt={values[currentValue]}
      />
    </div>
  );
}

export default function WaveformToggle({ onChange }) {
  return (
    <Toggle
      values={["sine", "square", "triangle", "sawtooth"]}
      component={WaveformToggleView}
      onChange={val => onChange(val)}
    />
  );
}
