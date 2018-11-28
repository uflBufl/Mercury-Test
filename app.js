async function sendRequest(url, options) {
  const response = await fetch(url, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    throw {
      error: json.error,
      status: response.status
    };
  }
}

class Panel extends React.Component {
  render() {
    return React.createElement("div", {
      className: "block"
    }, this.props.children);
  }

}

function Logo(props) {
  return React.createElement("img", {
    src: "img/w-mercury-development.svg",
    className: "logo"
  });
}

class Button_Profile extends React.Component {
  render() {
    return React.createElement("div", null, React.createElement(Button, {
      className: "form form__button_profile"
    }));
  }

}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.props.form,
      isDisabled: false
    };
  }

  render() {
    return React.createElement("input", {
      type: "submit",
      className: this.props.form == "login" ? "form__button" : "form form__button form__button_profile",
      disabled: this.props.isDisabled,
      value: this.props.form == "login" ? "Login" : "Logout"
    });
  }

}

class Input_Password extends React.Component {
  render() {
    return React.createElement("div", {
      className: "form__input_password"
    }, React.createElement(Input, {
      type: this.props.type,
      value: this.props.value,
      isDisabled: this.props.isDisabled,
      handleChangeValue: this.props.handleChangeValue,
      placeholder: "Password"
    }));
  }

}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  handleChangeValue(e) {
    this.props.handleChangeValue(e);
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };
    return React.createElement("input", {
      onClick: this.props.removeInvalid,
      type: this.props.type,
      className: "form__input",
      placeholder: this.props.placeholder,
      disabled: this.props.isDisabled,
      onChange: this.handleChangeValue,
      value: this.props.value,
      style: this.props.isInvalid == true ? errorChange : {}
    });
  }

}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "user@example.com",
      password: "mercdev",
      isDisabled: false,
      isInvalid: false,
      error: ""
    };
    this.removeInvalid = this.removeInvalid.bind(this);
    this.logIn = this.logIn.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async logIn(e) {
    e.preventDefault();
    this.setState({
      isDisabled: true,
      error: ""
    });
    var login = this.state.email;
    var password = this.state.password;
    var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";

    try {
      const response = await sendRequest(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: login,
          password: password
        })
      });
      const user = response;
      this.props.clickLogin(user);
    } catch (response) {
      if (response.status == 0) {
        this.setState({
          error: "No internet connection"
        });
      }

      if (response.status == 503) {
        this.setState({
          error: "Server is temporarily unavailable"
        });
      }

      if (response.status == 400) {
        this.setState({
          password: "",
          isInvalid: true,
          error: "E-Mail or password is incorrect"
        });
      } else {
        this.setState({
          error: response.error
        });
      }
    }

    this.setState({
      isDisabled: false
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
    console.log(this.state);
    return React.createElement("div", null, React.createElement(Logo, null), React.createElement(Panel, null, React.createElement("h1", {
      className: "block__headline"
    }, "Log In"), React.createElement("form", {
      onSubmit: this.logIn,
      className: "form"
    }, React.createElement(Input, {
      type: "email",
      removeInvalid: this.removeInvalid,
      value: "user@example.com",
      isInvalid: this.state.isInvalid,
      isDisabled: this.state.isDisabled,
      handleChangeValue: this.handleChangeEmail
    }), React.createElement(Input_Password, {
      type: "password",
      value: this.state.password,
      isDisabled: this.state.isDisabled,
      handleChangeValue: this.handleChangePassword
    }), React.createElement("div", {
      className: "form__error",
      id: "error",
      name: "error",
      style: !this.state.error == "" ? {
        display: "inline-block"
      } : {
        display: "none"
      }
    }, React.createElement("span", {
      id: "errortext",
      name: "errortext"
    }, this.state.error)), React.createElement(Button, {
      form: "login",
      isDisabled: this.state.isDisabled
    }))));
  }

}

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", null, React.createElement(Logo, null), React.createElement(Panel, null, React.createElement("form", {
      action: "login.html",
      method: "GET",
      onSubmit: this.props.clickLogout
    }, React.createElement("img", {
      src: this.props.user.photoUrl,
      className: "block__img",
      id: "photo"
    }), React.createElement("h1", {
      className: "block__headline block__headline_name",
      id: "UsName"
    }, this.props.user.name), React.createElement(Button, {
      form: "logout"
    }))));
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickLogout = this.clickLogout.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin(user) {
    this.setState({
      user
    });
  }

  clickLogout() {
    this.setState({
      user: null
    });
  }

  render() {
    if (this.state.user) {
      return React.createElement(LogOut, {
        clickLogout: this.clickLogout,
        user: this.state.user
      });
    }

    return React.createElement(LogIn, {
      clickLogin: this.clickLogin
    });
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));
