import ReactDOM from "react-dom";
import React from "react";

import Logo from "./components/Logo/Logo.js";
import Profile from "./screens/Profile/Profile.js";
import LogIn from "./screens/Login/LogIn.js";
import { UserContext } from "./store/user-context.js";
import "./assets/style.css";

import { Route, Link, Redirect, Switch } from "react-router-dom";
import BrowserRouter from "react-router-dom/es/BrowserRouter";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.submitLogout = this.submitLogout.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(user) {
    this.setState({
      user
    });
  }

  submitLogout() {
    this.setState({
      user: null
    });
  }

  render() {
    return (
      <div>
        <Logo />

        {this.state.user ? <Redirect to="/profile" /> : <Redirect to="/login" />}

        <UserContext.Provider value={this.state.user}>
          {this.state.user
            ? console.log("Redirect to profile")
            : console.log("Redirect to 123")}
            <Route
              path="/login"
              component={() => <LogIn submitLogin={this.submitLogin} />}
            />
            <Route
              path="/profile"
              component={() => <Profile onSubmit={this.submitLogout} />}
            />
        </UserContext.Provider>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
