import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <main>
          <switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
          </switch>
        </main>
      </Router>
    );
  }
}
