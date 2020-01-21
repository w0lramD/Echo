import React from "react";

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.clicking = false;
    this.frameCount = 0;
    this.state = {
      value: props.value || 0,
      label: props.label || ""
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
        onClick={() => {
          let { icons } = this.props;
          let { value } = this.state;
          value = (value + 1) % icons.length;
          this.setState({ value });
          this.props.onChange(value);
        }}
        onMouseOver={() => {
          if (this.state.clicking) {
            this.setState({ clicking: false });
          }
        }}
      >
        <View
          value={this.state.value}
          label={this.state.label}
          focus={this.props.focus}
          icons={this.props.icons}
        />
      </div>
    );
  }
}
