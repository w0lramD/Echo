import React from "react";
import { connect } from "react-redux";
import DelayView from "../uix/DelayView";
import "./EchoControls.sass";

let EchoControls = ({ synthState }) => {
  return (
    <div className="EchoControls">
      <DelayView value={synthState.echo1} />
      <DelayView value={synthState.echo2} />
      <DelayView value={synthState.echo3} />
      <DelayView value={synthState.echo4} />
    </div>
  );
};

EchoControls = connect(state => {
  const { synthState } = state;
  return { synthState };
})(EchoControls);

export default EchoControls;
