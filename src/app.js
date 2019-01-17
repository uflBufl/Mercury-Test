import ReactDOM from "react-dom";
import React from "react";

import Logo from "./components/Logo/Logo.js";
import Profile from "./screens/Profile/Profile.js";
import LogIn from "./screens/Login/LogIn.js";
import UserContext from "./store/user-context.js";
import "./assets/style.css";

import { observer } from "mobx-react"
import { Todo }from "./mobxTest.js"

import { Route, Link, Redirect, Switch } from "react-router-dom";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Button from "./components/Button/Button.js";

const newStore = new Todo();
newStore.newTitle("Title");

@observer class App extends React.Component {
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
    
    this.onClick = this.onClick.bind(this);

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


  onClick(){
    // console.log(1);
    // this.props.store.newTitle("123");
    this.props.store.title = "NewTitle";
    this.props.store.finished = !this.props.store.finished;
    console.log(this.props.store.finished);
    // console.log(store1);
    console.log(this.props.store.title);
    // store1.title = "NewTitle";
  }


  render() {
    return (
      <div>
        {/* <Logo /> */}


        {!this.props.store.finished &&  (<Logo />)}
        <h1>{this.props.store.title}</h1>
        <Button onClick = {this.onClick} />


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

ReactDOM.render(<App store={newStore} />, document.querySelector("#root"));
