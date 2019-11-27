import React from "react";
import Toggle from "./_Toggle";

function PlayToggleView({ values, currentValue, focus }) {
  return <div className="play-toggle toggle">{values[currentValue]}</div>;
}

export default function DirectionToggle({ onChange }) {
  return (
    <Toggle
      values={["■", "►"]}
      component={PlayToggleView}
      onChange={val => onChange(val)}
    />
  );
}
