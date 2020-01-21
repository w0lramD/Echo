import React from "react";
import Toggle from "./_Toggle";
import "./PlayToggle.css";

function PlayToggleView({ icons, value, focus }) {
  value = value || 0;
  return (
    <div className={"PlayToggle " + icons[value]}>
      {(icons[value] === "isNotPlaying" && "►") ||
        (icons[value] === "isPlaying" && "■")}
    </div>
  );
}

export default function PlayToggle({ value, focus, onChange }) {
  value = value ? 1 : 0;
  return (
    <Toggle
      View={PlayToggleView}
      value={value}
      icons={["isNotPlaying", "isPlaying"]}
      focus={focus}
      onChange={newValue => onChange(newValue)}
    />
  );
}
