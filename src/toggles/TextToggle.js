import React from "react";
import Toggle from "./_Toggle";
import "./TextToggle.css";

function TextToggleView({ value, label, options, focus }) {
  return (
    <div className={(focus && "TextToggle focus") || "TextToggle"}>
      {label && <p className="label">{label}</p>}
      <p className="option">{options[value]}</p>
    </div>
  );
}

export default function TextToggle(props) {
  return (
    <Toggle
      View={TextToggleView}
      value={props.value}
      label={props.label}
      focus={props.focus}
      options={props.options}
      onChange={newValue => props.onChange(newValue)}
    />
  );
}
