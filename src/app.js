import ReactDOM from "react-dom";
import React from "react";

import Logo from "./components/Logo/Logo.js";
import Profile from "./screens/Profile/Profile.js";
import LogIn from "./screens/Login/LogIn.js";
import UserContext from "./store/user-context.js";
import "./assets/style.css";

import { Route, Link, Redirect, Switch } from "react-router-dom";
import BrowserRouter from "react-router-dom/es/BrowserRouter";

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.submitLogin = user => {
    //   this.setState({
    //     user
    //   });
    // };

    // this.submitLogout = () => {
    //   this.setState({
    //     user: null
    //   });
    // };
    
    this.submitLogout = this.submitLogout.bind(this);
    this.submitLogin = this.submitLogin.bind(this);

    this.state = {
      submitLogin: this.submitLogin,
      submitLogout: this.submitLogout
    };

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
        <UserContext.Provider value={this.state}>
          <BrowserRouter>
            <div>
              {!this.state.user && (
                <Switch>
                  <Route path="/login" component={LogIn} />
                  <Redirect to="/login" />
                </Switch>
              )}
              {this.state.user && (
                <Switch>
                  <Route path="/profile" component={Profile} />
                  <Redirect to="/profile" />
                </Switch>
              )}
            </div>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
