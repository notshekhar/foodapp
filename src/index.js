import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./components/main";
import Suggest from "./components/suggestion";
import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/suggestions" component={Suggest} />
      </Router>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);