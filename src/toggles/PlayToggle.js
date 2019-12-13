import React from "react";
import Toggle from "./_Toggle";
import "./PlayToggle.css";

function PlayToggleView({ labels, value, focus }) {
  value = value || 0;
  return (
    <div className={"PlayToggle " + labels[value]}>
      {(labels[value] === "isNotPlaying" && "►") ||
        (labels[value] === "isPlaying" && "■")}
    </div>
  );
}

export default function PlayToggle({ value, focus, onChange }) {
  value = value ? 1 : 0;
  return (
    <Toggle
      View={PlayToggleView}
      value={value}
      labels={["isNotPlaying", "isPlaying"]}
      focus={focus}
      onChange={newValue => onChange(newValue)}
    />
  );
}
