import React from "react";
import PlayToggle from "./toggles/PlayToggle";
import "./Sequencer.css";

export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      playing: false,
      timeline: null
    };
  }

  play() {
    const clock = () => {
      if (this.playing) {
        this.setState({ currentTime: this.state.currentTime + 1 });
        return setTimeout(clock, 100);
      } else return null;
    };
    this.playing = true;
    this.setState({ timeline: clock() });
  }

  stop() {
    this.playing = false;
    clearTimeout(this.state.currentTime);
    this.setState({ currentTime: 0 });
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        currentTime: this.state.currentTime
      });
    });
    return (
      <div className="Sequencer">
        <PlayToggle
          onChange={value => {
            if (value === "►") this.play();
            else if (value === "■") this.stop();
          }}
        />
        {children}
      </div>
    );
  }
}
