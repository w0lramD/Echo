import React, { useState } from "react";
import "./Knob.css";

export default function Knob({ initialValue, onUpdate, maxValue, color }) {
  const [value, setValue] = useState(initialValue || 0);
  const [currentY, setCurrentY] = useState(0);

  const updateValue = mouseY => {
    let newValue = value - (mouseY - currentY);
    if (newValue > 132) {
      newValue = 132;
    } else if (newValue < -132) {
      newValue = -132;
    }
    setValue(newValue);
    onUpdate(((newValue + 132) / 264) * 127); //wow....
  };

  const handleMouseMove = e => {
    updateValue(e.clientY);
    setCurrentY(e.clientY);
  };

  const handleMouseUp = e => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    setCurrentY(0);
  };

  const handleMouseDown = e => {
    setCurrentY(e.clientY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const getRotation = val => {
    return 184 - (184 / (132 * 2)) * (val + 132);
  };

  return (
    <div className="knob">
      <div className="knob-container" onMouseDown={e => handleMouseDown(e)}>
        <svg className="knob-svg" viewBox="0 0 100 100">
          <path d="M20,76 A 40 40 0 1 1 80 76" stroke="#55595C" />
          <path
            d="M20,76 A 40 40 0 1 1 80 76"
            stroke={color || "#21CD92"}
            strokeDasharray="184"
            style={{
              strokeDashoffset: getRotation(value),
              transition: "0.1s cubic-bezier(0, 0, 0.24, 1)"
            }}
          />
        </svg>
        <div
          className="knob-dial"
          style={{
            transform: `translate(-50%,-50%) rotate(${value}deg)`
          }}
        />
      </div>
    </div>
  );
}
