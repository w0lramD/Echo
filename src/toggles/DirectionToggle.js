import React from "react";
import Toggle from "./_Toggle";
import "./DirectionToggle.css";

function DirectionToggleView({ values, currentValue, focus }) {
  return <div className="DirectionToggle">{values[currentValue]}</div>;
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
