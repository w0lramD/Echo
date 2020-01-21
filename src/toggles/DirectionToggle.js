import React from "react";
import Toggle from "./_Toggle";
import "./DirectionToggle.css";

function DirectionToggleView({ icons, value, focus }) {
  return (
    <div className="DirectionToggle">
      {(icons[value] === "forwards" && "→") ||
        (icons[value] === "backwards" && "←") ||
        (icons[value] === "circular" && "↔") ||
        (icons[value] === "random" && "?")}
    </div>
  );
}

export default function DirectionToggle({ value, focus, onChange }) {
  return (
    <Toggle
      View={DirectionToggleView}
      icons={["forwards", "backwards", "circular", "random"]}
      value={value}
      onChange={newValue => onChange(newValue)}
    />
  );
}
