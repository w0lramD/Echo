import React from "react";
import "./Knob.css";

export default class Knob extends React.Component {
  maxKnobValue = 132;
  typeDashLengths = { 1: 184, 2: 251.5 };
  typeValueOffsets = { 1: 132, 2: 0 };
  typePaths = {
    1: "M20,76 A 40 40 0 1 1 80 76",
    2: "M50.01,10 A 40 40 0 1 1 50 10"
  };

  state = {
    active: false,
    value: this.props.initialValue || 0,
    currentY: 0
  };

  updateValue = mouseY => {
    let newValue = this.state.value - (mouseY - this.state.currentY);

    if (newValue > this.maxKnobValue) {
      newValue = this.maxKnobValue;
    } else if (newValue < -this.maxKnobValue) {
      newValue = -this.maxKnobValue;
    }

    this.setState({ value: newValue }, () => {
      this.props.onUpdate && this.props.onUpdate(this.state.value);
    });
  };

  handleMouseMove = e => {
    this.updateValue(e.clientY);
    this.setState({ currentY: e.clientY });
  };

  handleMouseUp = e => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.setState({ currentY: 0 });
  };

  handleMouseDown = e => {
    this.setState({ currentY: e.clientY });
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  getRotation = (val, type) => {
    return (
      this.typeDashLengths[type] -
      (184 / (this.maxKnobValue * 2)) * (val + this.typeValueOffsets[type])
    );
  };

  render = () => {
    const { type, color } = this.props;

    return (
      <div className="knob">
        <div className="knob-container" onMouseDown={this.handleMouseDown}>
          <svg className="knob-svg" viewBox="0 0 100 100">
            <path d={"M20,76 A 40 40 0 1 1 80 76"} stroke={"#55595C"} />
            <path
              d={this.typePaths[type]}
              stroke={color || "#21CD92"}
              strokeDasharray={this.typeDashLengths[type]}
              style={{
                strokeDashoffset: this.getRotation(this.state.value, type),
                transition: "0.1s cubic-bezier(0, 0, 0.24, 1)"
              }}
            />
          </svg>
          <div
            className="knob-dial"
            style={{
              transform: `translate(-50%,-50%) rotate(${this.state.value}deg)`
            }}
          />
        </div>
      </div>
    );
  };
}
