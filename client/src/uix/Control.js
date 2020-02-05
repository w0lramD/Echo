import React from "react";
import "./Control.sass";

export default function Control({ value, label, focus }) {
  return (
    <div className={(focus && "Control focus") || "Control"}>
      {label} {value}
    </div>
  );
}
