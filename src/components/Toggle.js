import React, { useState, useEffect, useRef } from "react";
import "./Toggle.css";

export default function Toggle({
  defaultValue,
  onToggle,
  labelOnTrue,
  labelOnFalse,
  focused
}) {
  const [value, setValue] = useState(defaultValue || false);

  const clicking = useRef(false);
  useEffect(() => {
    document.addEventListener("mousedown", () => (clicking.current = true));
    document.addEventListener("mouseup", () => (clicking.current = false));
  }, []);

  return (
    <div
      className="toggle-container"
      onClick={() => {
        setValue(!value);
        if (onToggle) onToggle(value);
      }}
      onMouseOver={() => {
        if (clicking.current) {
          setValue(!value);
          if (onToggle) onToggle(value);
        }
      }}
    >
      <div
        className={
          (focused && "toggle-container focused") || "toggle-container"
        }
      >
        {value && (labelOnTrue || 1)}
        {!value && (labelOnFalse || 0)}
      </div>
    </div>
  );
}
