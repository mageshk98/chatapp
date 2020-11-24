import React from "react";
import ReactDOM from "react-dom";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import rootReducers from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";

const chatStore = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={chatStore}>
    <App />
  </Provider>,

  document.getElementById("root")
);
