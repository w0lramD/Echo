import React from "react";
import Toggle from "./_Toggle";
import "./PlayToggle.css";

function PlayToggleView({ values, currentValue, focus }) {
  return <div className="PlayToggle">{values[currentValue]}</div>;
}

export default function PlayToggle({ onChange }) {
  return (
    <Toggle
      values={["■", "►"]}
      component={PlayToggleView}
      onChange={val => onChange(val)}
    />
  );
}
