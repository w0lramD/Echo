import React from "react";
import "./Number.css";

export default class Number extends React.Component {
  constructor(props) {
    super(props);
    this.clicking = false;
    this.originY = null;
    this.frameCount = 0;
    this.state = {
      number: props.value
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", () => (this.clicking = false));
    document.addEventListener("mousemove", ({ screenY }) => {
      if (this.clicking) {
        if (!this.originY) {
          this.originY = screenY;
        } else {
          this.frameCount++;
          if (this.frameCount % 5 === 0) {
            if (this.originY > screenY) this.incrementNumber(); //up
            if (this.originY < screenY) this.decrementNumber(); //down
          }
        }
      }
    });
  }

  incrementNumber() {
    let newNumber;
    newNumber = Math.round((this.state.number + this.props.step) * 100) / 100;
    if (newNumber <= this.props.max && newNumber >= this.props.min) {
      this.setState({ number: newNumber });
      this.props.onChange(newNumber);
    }
  }

  decrementNumber() {
    let newNumber;
    newNumber = Math.round((this.state.number - this.props.step) * 100) / 100;
    if (newNumber <= this.props.max && newNumber >= this.props.min) {
      this.setState({ number: newNumber });
      this.props.onChange(newNumber);
    }
  }

  render() {
    return (
      <div
        className="number-container"
        onMouseDown={e => {
          this.clicking = true;
          this.originY = null;
        }}
      >
        {this.state.number || 0}
      </div>
    );
  }
}
