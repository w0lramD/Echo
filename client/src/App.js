import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sequencer from "./containers/Sequencer";
import Synth from "./containers/Synth";
import OscControls from "./containers/OscControls";
import FilterControls from "./containers/FilterControls";
import EchoControls from "./containers/EchoControls";
import "./App.sass";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="panel">
          <Switch>
            <Route path="/sequencer">
              <Sequencer />
            </Route>
            <Route path="/oscillator">
              <OscControls />
            </Route>
            <Route path="/filter">
              <FilterControls />
            </Route>
            <Route path="/echo">
              <EchoControls />
            </Route>
          </Switch>
          <Synth />
        </div>
        <div className="navigation-bar">
          <div>
            <Link to="/sequencer">
              <img src="/icons/sequence.svg" alt="sequencer" />
            </Link>
          </div>
          <div>
            <Link to="/oscillator">
              <img src="/icons/oscillator.svg" alt="oscillator" />
            </Link>
          </div>
          <div>
            <Link to="/filter">
              <img src="/icons/filter.svg" alt="filter" />
            </Link>
          </div>
          <div>
            <Link to="/echo">
              <img src="/icons/echo.svg" alt="echo" />
            </Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
