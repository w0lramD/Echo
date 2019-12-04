import React from "react";
import Toggle from "./_Toggle";
import "./PlayToggle.css";

function PlayToggleView({ values, currentValue, focus }) {
  return (
    <div className={"PlayToggle " + values[currentValue]}>
      {(values[currentValue] === "isNotPlaying" && "►") ||
        (values[currentValue] === "isPlaying" && "■")}
    </div>
  );
}

export default function PlayToggle({ onChange }) {
  return (
    <Toggle
      values={["isNotPlaying", "isPlaying"]}
      component={PlayToggleView}
      onChange={val => onChange(val === "isPlaying" ? true : false)}
    />
  );
}
