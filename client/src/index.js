import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import App from "./App";
import preset from "./presets/default";
import * as serviceWorker from "./serviceWorker";
import "normalize.css";

const store = createStore(rootReducer, preset);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
