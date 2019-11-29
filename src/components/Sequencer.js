import React from "react";
import PlayToggle from "./toggles/PlayToggle";
import BpmSlider from "./sliders/BpmSlider";
import "./Sequencer.css";

export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      playing: false,
      timeline: null,
      bpm: props.defaultBpm,
      beats: props.defaultBeats
    };
  }

  play() {
    this.playing = true;
    this.setState({ timeline: this.clock() });
  }

  stop() {
    this.playing = false;
    clearTimeout(this.state.currentTime);
    this.setState({ currentTime: 0 });
  }

  render() {
    this.clock = () => {
      if (this.playing) {
        this.setState({ currentTime: this.state.currentTime + 1 });
        const timeout = (60 * 1000) / this.state.bpm / this.state.beats;
        console.log(timeout);
        return setTimeout(this.clock, timeout);
      } else return null;
    };
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        currentTime: this.state.currentTime
      });
    });
    return (
      <div className="Sequencer">
        <div className="controls">
          <PlayToggle
            onChange={value => {
              if (value === "isPlaying") this.play();
              else if (value === "isNotPlaying") this.stop();
            }}
          />
          <BpmSlider
            defaultValue={this.props.defaultBpm}
            onChange={bpm => this.setState({ bpm })}
          />
        </div>
        {children}
      </div>
    );
  }
}
