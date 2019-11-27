import React from "react";
import Toggle from "./_Toggle";

function DirectionToggleView({ values, currentValue, focus }) {
  return (
    <div
      className={
        (focus && "direction-toggle toggle focused") ||
        "direction-toggle toggle"
      }
    >
      {values[currentValue]}
    </div>
  );
}

export default function DirectionToggle({ onChange }) {
  return (
    <Toggle
      values={["→", "←", "↔", "?"]}
      component={DirectionToggleView}
      onChange={val => onChange(val)}
    />
  );
}
