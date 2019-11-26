import React from "react";

export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      timeline: null
    };
  }

  componentDidMount() {
    this.setState({ timeline: this.clock() });
  }

  clock() {
    this.setState({ currentStep: this.state.currentStep + 1 });
    setTimeout(this.clock, 100);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.components.map((Component, i) => (
          <Component key={i} currentStep={this.state.currentStep} />
        ))}
      </React.Fragment>
    );
  }
}
