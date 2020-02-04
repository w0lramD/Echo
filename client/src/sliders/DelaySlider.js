import React, { useEffect, useRef } from "react";
import Slider from "./_Slider";
import "./DelaySlider.sass";

function DelaySliderView({ value, focus }) {
  const canvas = useRef(null);
  useEffect(() => {
    const cnv = canvas.current;
    const ctx = cnv.getContext("2d");
    if (focus) ctx.strokeStyle = "#212121";
    else ctx.strokeStyle = "#ffff";
    let r = 30 * value + 5;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.beginPath();
    while (r > 0) {
      ctx.moveTo(cnv.width / 2 + r, cnv.height / 2);
      ctx.arc(cnv.width / 2, cnv.height / 2, r, 0, Math.PI * 2);
      r -= 4;
    }
    ctx.stroke();
  }, [value, focus]);

  return (
    <canvas
      className={(focus && "DelaySlider focus") || "DelaySlider"}
      ref={canvas}
      width={60}
      height={60}
    ></canvas>
  );
}

export default function DelaySlider({ value, focus, onChange }) {
  return (
    <Slider
      View={DelaySliderView}
      value={value}
      min={0}
      max={1}
      step={0.1}
      focus={focus}
      onChange={val => onChange(val)}
    />
  );
}
