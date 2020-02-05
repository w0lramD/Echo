import React, { useEffect, useRef } from "react";
import "./DelayView.sass";

export default function DelayView({ value }) {
  const canvas = useRef(null);
  useEffect(() => {
    const cnv = canvas.current;
    const ctx = cnv.getContext("2d");
    ctx.strokeStyle = "#121212";
    let r = 10 * value + 5;
    ctx.clearRect(0, 0, cnv.width / 4, cnv.height / 2);
    ctx.arc(cnv.width / 2, cnv.height / 2, r, 0, Math.PI * 2);
    ctx.stroke();
  }, [value]);

  return (
    <canvas
      className="DelaySlider"
      ref={canvas}
      width={46}
      height={46}
    ></canvas>
  );
}
