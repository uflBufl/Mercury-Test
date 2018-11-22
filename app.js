async function request(url, options) {
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

function Logo(props) {
  return React.createElement("img", {
    src: "img/w-mercury-development.svg",
    className: "logo"
  });
}

function LogoutImg(props) {
  return React.createElement("img", {
    src: props.user.photoUrl,
    className: "block__img",
    id: "photo"
  });
}

function LogoutHead(props) {
  return React.createElement("h1", {
    className: "block__headline block__headline_name",
    id: "UsName"
  }, props.user.name);
}

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("input", {
      type: "submit",
      className: "form form__button form__button_profile",
      value: "Logout"
    });
  }

}

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLock: false
    };
  }

  render() {
    return React.createElement("input", {
      type: "submit",
      name: "login_button",
      id: "login_button",
      className: "form__button",
      disabled: this.props.IsLock,
      value: "Login"
    });
  }

}

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", {
      className: "form__error",
      id: "error",
      name: "error",
      style: !this.props.error == "" ? {
        display: "inline-block"
      } : {
        display: "none"
      }
    }, React.createElement("span", {
      id: "errortext",
      name: "errortext"
    }, this.props.error));
  }

}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
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
      onClick: this.props.removeRedColor,
      type: this.state.type,
      className: this.props.type == "password" ? "form__input form__input_password" : "form__input",
      placeholder: this.props.type == "password" ? "Password" : "E-Mail",
      disabled: this.props.IsLock,
      onChange: this.handleChange,
      value: this.state.value,
      style: this.props.IsRed == true ? errorChange : {}
    });
  }

}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "user@example.com",
      password: "mercdev",
      IsLock: false,
      IsRed: false,
      error: ""
    };
    this.removeRedColor = this.removeRedColor.bind(this);
    this.logIn = this.logIn.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async logIn(e) {
    e.preventDefault();
    this.setState({
      IsLock: true,
      error: ""
    });
    var login = this.state.email;
    var password = this.state.password;
    var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";

    try {
      const response = await request(url, {
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
          IsRed: true,
          error: "E-Mail or password is incorrect"
        });
      } else {
        this.setState({
          error: response.error
        });
      }
    }

    this.setState({
      IsLock: false
    });
  }

  removeRedColor() {
    this.setState({
      IsRed: false
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
    return React.createElement("div", null, React.createElement(Logo, null), React.createElement("div", {
      className: "block"
    }, React.createElement("h1", {
      className: "block__headline"
    }, "Log In"), React.createElement("form", {
      onSubmit: this.logIn,
      className: "form"
    }, React.createElement(Input, {
      type: "email",
      removeRedColor: this.removeRedColor,
      value: "user@example.com",
      IsRed: this.state.IsRed,
      IsLock: this.state.IsLock,
      handleChange: this.handleChangeEmail
    }), React.createElement(Input, {
      type: "password",
      value: this.state.password,
      IsLock: this.state.IsLock,
      handleChange: this.handleChangePassword
    }), React.createElement(Error, {
      error: this.state.error
    }), React.createElement(LoginButton, {
      lock: this.state.IsLock
    }))));
  }

}

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", null, React.createElement(Logo, null), React.createElement("div", {
      className: "block"
    }, React.createElement("form", {
      action: "login.html",
      method: "GET",
      onSubmit: this.props.clickLogout
    }, React.createElement(LogoutImg, {
      user: this.props.user
    }), React.createElement(LogoutHead, {
      user: this.props.user
    }), React.createElement(LogoutButton, null))));
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
