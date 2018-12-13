import React from "react";
import login from "../../services/loginModule.js";
import Panel from "../../components/Panel/Panel.js";
import Button from "../../components/Button/Button.js";
import Input from "../../components/Input/Input.js";
import loginStyle from "./Login.css";
import inputPasswordStyle from "../../components/Input/Input.css";
// import { LoginContext } from "./login-context.js";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "user@example.com",
      password: "mercdev",
      isSending: false,
      isInvalid: false,
      error: ""
    };

    this.removeInvalid = this.removeInvalid.bind(this);
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

    // var login = this.state.email;
    // var password = this.state.password;
    // var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";

    try {
      // const request = createPostRequest(login, password);
      // const response = await sendRequest(url, request);
      const response = await login(this.state.email, this.state.password);

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

  removeInvalid() {
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
          {/* <LoginContext.Provider
            value={{
              email: this.state.email,
              password: this.state.password,
              handleChangeEmail,
              handleChangePassword
            }}
          > */}
          <h1 className={loginStyle.block__headline}>Log In</h1>
          <form onSubmit={this.submitForm} className="form">
            <Input
              type="email"
              onClick={this.removeInvalid}
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
              addClass={inputPasswordStyle.form__input_password}
            />

            <div
              className={loginStyle.form__error}
              style={
                !this.state.error == ""
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
            >
              <span id="errortext" name="errortext">
                {this.state.error}
              </span>
            </div>

            <Button value="Login" disabled={this.state.isSending} />
          </form>
          {/* </LoginContext.Provider> */}
        </Panel>
      </div>
    );
  }
}
