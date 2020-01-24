import React from "react";
import Toggle from "./_Toggle";
import "./DirectionToggle.css";

function DirectionToggleView({ options, value, focus }) {
  return (
    <div className="DirectionToggle">
      {(options[value] === "forwards" && "→") ||
        (options[value] === "backwards" && "←") ||
        (options[value] === "circular" && "↔") ||
        (options[value] === "random" && "?")}
    </div>
  );
}

export default function DirectionToggle({ value, focus, onChange }) {
  return (
    <Toggle
      View={DirectionToggleView}
      options={["forwards", "backwards", "circular", "random"]}
      value={value}
      onChange={newValue => onChange(newValue)}
    />
  );
}
