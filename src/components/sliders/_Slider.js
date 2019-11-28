import React from "react";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.clicking = false;
    this.originY = null;
    this.frameCount = 0;
    this.state = {
      value: props.defaultValue || 0
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
            if (this.originY > screenY) this.incrementValue(); //up
            if (this.originY < screenY) this.decrementValue(); //down
          }
        }
      }
    });
  }

  incrementValue() {
    let newValue;
    newValue = Math.round((this.state.value + this.props.step) * 100) / 100;
    if (newValue <= this.props.max && newValue >= this.props.min) {
      this.setState({ value: newValue });
      this.props.onChange(newValue);
    }
  }

  decrementValue() {
    let newValue;
    newValue = Math.round((this.state.value - this.props.step) * 100) / 100;
    if (newValue <= this.props.max && newValue >= this.props.min) {
      this.setState({ value: newValue });
      this.props.onChange(newValue);
    }
  }

  render() {
    const Component = this.props.component;
    return (
      <div
        style={{ userSelect: "none" }}
        onMouseDown={e => {
          this.clicking = true;
          this.originY = null;
        }}
      >
        <Component value={this.state.value} {...this.props} />
      </div>
    );
  }
}
