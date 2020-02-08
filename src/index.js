import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import "antd/dist/antd.css";

import history from "./config/history";
import store from "./config/store";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Router history={history}>
        <App />
      </Router>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
