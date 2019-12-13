import React from "react";
import Toggle from "./_Toggle";
import "./WaveformToggle.css";

function WaveformToggleView({ labels, value, focus }) {
  return (
    <div className={(focus && "WaveformToggle focus") || "WaveformToggle"}>
      <img src={"/icons/" + labels[value] + ".svg"} alt={labels[value]} />
    </div>
  );
}

export default function WaveformToggle({ value, focus, onChange }) {
  return (
    <Toggle
      View={WaveformToggleView}
      labels={["sine", "square", "triangle", "sawtooth"]}
      value={value}
      focus={focus}
      onChange={newValue => onChange(newValue)}
    />
  );
}
