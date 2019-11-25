import React from "react";
import "./_Toggle.css";

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.clicking = false;
    this.frameCount = 0;
    this.state = {
      currentValue: props.defaultValue || 0
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", () =>
      this.setState({ clicking: true })
    );
    document.addEventListener("mouseup", () =>
      this.setState({ clicking: false })
    );
  }

  render() {
    const Component = this.props.component;
    return (
      <div
        className="toggle-container"
        onClick={() => {
          let { values } = this.props;
          let { currentValue } = this.state;
          this.setState({ currentValue: (currentValue + 1) % values.length });
          this.props.onChange(values[currentValue]);
        }}
        onMouseOver={() => {
          if (this.state.clicking) {
            this.setState({ clicking: false });
          }
        }}
      >
        <Component
          currentValue={this.state.currentValue}
          values={this.props.values}
        />
      </div>
    );
  }
}
