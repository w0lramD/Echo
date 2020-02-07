import React from "react";
import { connect } from "react-redux";
import Control from "../uix/Control";
import "./EchoControls.sass";

let EchoControls = ({ synthState, showingCtls }) => {
  return (
    <div className="EchoControls">
      {showingCtls && (
        <>
          <Control label="1st echo" value={synthState.echo1} />
          <Control label="2nd echo" value={synthState.echo2} />
          <Control label="3rd echo" value={synthState.echo3} />
          <Control label="4th echo" value={synthState.echo4} />
        </>
      )}
    </div>
  );
};

EchoControls = connect(state => {
  const { synthState } = state;
  const { showingCtls } = state.utils;
  return { synthState, showingCtls };
})(EchoControls);

export default EchoControls;
