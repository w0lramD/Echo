import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import App from "./App";
import presets from "./presets";
import * as serviceWorker from "./serviceWorker";
import "normalize.css";

const store = createStore(rootReducer, presets[0]);

ReactDOM.render(
  <Provider store={store}>
    <App presets={presets} />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
