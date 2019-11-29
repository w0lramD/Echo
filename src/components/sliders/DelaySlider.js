import React, { useEffect, useRef } from "react";
import Slider from "./_Slider";
import "./DelaySlider.css";

function DelaySliderView({ value, focus }) {
  const canvas = useRef(null);
  useEffect(() => {
    const cnv = canvas.current;
    const ctx = cnv.getContext("2d");
    ctx.strokeStyle = "white";
    let r = 30 * value;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();
    while (r > 0) {
      ctx.moveTo(cnv.width / 2 + r, cnv.height / 2);
      ctx.arc(cnv.width / 2, cnv.height / 2, r, 0, Math.PI * 2);
      r -= 4;
    }
    ctx.stroke();
  }, [value]);

  return (
    <canvas
      className={(focus && "DelaySlider focused") || "DelaySlider"}
      ref={canvas}
      width={60}
      height={60}
    ></canvas>
  );
}

export default function DelaySlider({ onChange }) {
  return (
    <Slider
      min={0}
      max={1}
      step={0.1}
      component={DelaySliderView}
      onChange={val => onChange(val)}
    />
  );
}
