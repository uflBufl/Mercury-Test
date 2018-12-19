import React from "react";
import * as http from "../../services/http.js";
import Panel from "../../components/Panel/Panel.js";
import Button from "../../components/Button/Button.js";
import Input from "../../components/Input/Input.js";
import styles from "./Login.css";
import { UserContext } from "../../store/user-context.js";

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "user@example.com",
      password: "mercdev",
      isSending: false,
      isInvalid: false,
      error: ""
    };

    this.removeHighlightRed = this.removeHighlightRed.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async submitForm(e) {
    e.preventDefault();

    this.setState({
      isSending: true,
      error: ""
    });

    try {
      const response = await http.post(
        this.state.email,
        this.state.password
      );

      const user = response;

      this.props.submitLogin(user);
    } catch (response) {
      if (response.status == 400) {
        this.setState({
          password: "",
          isInvalid: true
        });
      }

      this.setState({
        error: response.error
      });
    }
    this.setState({
      isSending: false
    });
  }

  removeHighlightRed() {
    this.setState({
      isInvalid: false
    });
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Panel>
          <h1 className={styles.block__headline}>Log In</h1>

          <form onSubmit={this.submitForm} className="form">
            <Input
              type="email"
              onFocus={this.removeHighlightRed}
              value={this.state.email}
              isInvalid={this.state.isInvalid}
              disabled={this.state.isSending}
              onChange={this.handleChangeEmail}
              placeholder="E-Mail"
            />

            <Input
              type="password"
              value={this.state.password}
              disabled={this.state.isSending}
              onChange={this.handleChangePassword}
              placeholder="Password"
              className={styles.form__input_password}
            />

            <div
              className={styles.form__error}
              style={
                !this.state.error == ""
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
            >
              <span>{this.state.error}</span>
            </div>

            <Button value="Login" disabled={this.state.isSending} />
          </form>
        </Panel>
      </div>
    );
  }
}

function logInWithUserContext(Component) {
  return class WithUserContext extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </UserContext.Consumer>
      );
    }
  };
}

export { logInWithUserContext, LogIn };