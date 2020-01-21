import React from "react";
import Toggle from "./_Toggle";
import "./IconToggle.css";

function IconToggleView({ value, label, icons, focus }) {
  return (
    <div className={(focus && "IconToggle focus") || "IconToggle"}>
      {label && <p>{label}</p>}
      <img src={"/icons/" + icons[value] + ".svg"} alt={icons[value]} />
    </div>
  );
}

export default function IconToggle(props) {
  return (
    <Toggle
      View={IconToggleView}
      value={props.value}
      label={props.label}
      focus={props.focus}
      icons={props.icons}
      onChange={newValue => props.onChange(newValue)}
    />
  );
}
