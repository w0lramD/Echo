import React from "react";
import PlayToggle from "./toggles/PlayToggle";
import BpmSlider from "./sliders/BpmSlider";
import "./Sequencer.css";

export default class Sequencer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Sequencer">
        <div className="controls">
          <PlayToggle
            onChange={value => {
              if (value === "isPlaying") {
                this.play();
                if (this.props.onPlay) this.props.onPlay();
              } else if (value === "isNotPlaying") {
                this.stop();
                if (this.props.onStop) this.props.onStop();
              }
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
