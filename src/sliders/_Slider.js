import React from "react";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.clicking = false;
    this.originY = null;
    this.frameCount = 0;
    this.state = {
      value: props.value || 0,
      label: props.label || ""
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
    let { value } = this.state;
    let { step, min, max } = this.props;
    value = Math.round((value + step) * 100) / 100;
    if (value <= max && value >= min) {
      this.setState({ value });
      this.props.onChange(value);
    }
  }

  decrementValue() {
    let { value } = this.state;
    let { step, min, max } = this.props;
    value = Math.round((value - step) * 100) / 100;
    if (value <= max && value >= min) {
      this.setState({ value });
      this.props.onChange(value);
    }
  }

  compoenntDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value)
      if (this.props.value !== this.state.value)
        this.setState({ value: this.props.value });
  }

  render() {
    const View = this.props.View;
    return (
      <div
        style={{ userSelect: "none" }}
        onMouseDown={() => {
          this.clicking = true;
          this.originY = null;
        }}
      >
        <View
          value={this.state.value}
          label={this.state.label}
          focus={this.props.focus}
        />
      </div>
    );
  }
}
