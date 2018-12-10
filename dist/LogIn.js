import login from "./loginModule.js";
import Panel from "./Panel.js";
import Button from "./Button.js";
import Input from "./Input.js"; // import { LoginContext } from "./login-context.js";

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
    }); // var login = this.state.email;
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
    return React.createElement("div", null, React.createElement(Panel, null, React.createElement("h1", {
      className: "block__headline"
    }, "Log In"), React.createElement("form", {
      onSubmit: this.submitForm,
      className: "form"
    }, React.createElement(Input, {
      type: "email",
      onClick: this.removeInvalid,
      value: this.state.email,
      isInvalid: this.state.isInvalid,
      disabled: this.state.isSending,
      onChange: this.handleChangeEmail,
      placeholder: "E-Mail"
    }), React.createElement(Input, {
      type: "password",
      value: this.state.password,
      disabled: this.state.isSending,
      onChange: this.handleChangePassword,
      placeholder: "Password",
      addClass: "form__input_password"
    }), React.createElement("div", {
      className: "form__error",
      style: !this.state.error == "" ? {
        display: "inline-block"
      } : {
        display: "none"
      }
    }, React.createElement("span", {
      id: "errortext",
      name: "errortext"
    }, this.state.error)), React.createElement(Button, {
      value: "Login",
      disabled: this.state.isSending
    }))));
  }

}