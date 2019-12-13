import React from "react";
import Toggle from "./_Toggle";
import "./DirectionToggle.css";

function DirectionToggleView({ labels, value, focus }) {
  return (
    <div className="DirectionToggle">
      {(labels[value] === "forwards" && "→") ||
        (labels[value] === "backwards" && "←") ||
        (labels[value] === "circular" && "↔") ||
        (labels[value] === "random" && "?")}
    </div>
  );
}

export default function DirectionToggle({ value, focus, onChange }) {
  return (
    <Toggle
      View={DirectionToggleView}
      labels={["forwards", "backwards", "circular", "random"]}
      value={value}
      onChange={newValue => onChange(newValue)}
    />
  );
}
