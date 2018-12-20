import React from "react";
import http from "../../services/http.js";
import Panel from "../../components/Panel/Panel.js";
import Button from "../../components/Button/Button.js";
import Input from "../../components/Input/Input.js";
import styles from "./Login.css";
import withUserContext from "../../store/withUserContext.js";

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
      const url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";
      const params = JSON.stringify({ email: this.state.email, password: this.state.password });

      const response = await http.post(
        url, params
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
          <h1 className={styles.headline}>Log In</h1>

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
              className={styles.input_password}
            />

            <div
              className={styles.error}
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

const LogInWithUserContext = withUserContext(LogIn);
export default LogInWithUserContext;