import React from "react";
import Toggle from "./_Toggle";
import "./IconToggle.sass";

function IconToggleView({ value, label, options, focus }) {
  return (
    <div className={(focus && "IconToggle focus") || "IconToggle"}>
      {label && <p>{label}</p>}
      <img src={"/icons/" + options[value] + ".svg"} alt={options[value]} />
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
      options={props.options}
      onChange={newValue => props.onChange(newValue)}
    />
  );
}
