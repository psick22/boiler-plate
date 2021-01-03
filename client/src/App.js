import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage.js";
import LoginPage from "./components/views/LoginPage/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage/RegisterPage.js";

function App() {
  return (
    <Router>
      <div>
        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
        <Switch>
          <Route exact path="/" component={LandingPage}>
            <LandingPage />
          </Route>
          <Route exact path="/login" component={LoginPage}>
            <LoginPage />
          </Route>
          <Route exact path="/register" component={RegisterPage}>
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
