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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "user@example.com",
      password: "mercdev",
      lock: false,
      red: false,
      error: ""
    };
    this.logout = this.logout.bind(this);
    this.logIn = this.logIn.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async logIn(e) {
    e.preventDefault();
    this.setState({
      lock: true,
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
      this.setState({
        user
      });
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
          red: true,
          error: "E-Mail or password is incorrect"
        });
      } else {
        this.setState({
          error: response.error
        });
      }
    }

    this.setState({
      lock: false
    });
  }

  remove() {
    this.setState({
      red: false
    });
  }

  logout() {
    this.setState({
      user: null
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
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };

    if (this.state.user) {
      return React.createElement("div", null, React.createElement("img", {
        src: "img/w-mercury-development.svg",
        className: "logo"
      }), React.createElement("div", {
        className: "block"
      }, React.createElement("form", {
        action: "login.html",
        method: "GET",
        onSubmit: this.logout
      }, React.createElement("img", {
        src: this.state.user.photoUrl,
        className: "block__img",
        id: "photo"
      }), React.createElement("h1", {
        className: "block__headline block__headline_name",
        id: "UsName"
      }, this.state.user.name), React.createElement("input", {
        type: "submit",
        onClick: this.logout,
        className: "form form__button form__button_profile",
        value: "Logout"
      }))));
    }

    return React.createElement("div", null, React.createElement("img", {
      src: "img/w-mercury-development.svg",
      className: "logo"
    }), React.createElement("div", {
      className: "block"
    }, React.createElement("h1", {
      className: "block__headline"
    }, "Log In"), React.createElement("form", {
      onSubmit: this.logIn,
      className: "form"
    }, React.createElement("input", {
      onClick: this.remove,
      type: "email",
      name: "login",
      id: "login",
      className: "form__input",
      placeholder: "E-Mail",
      onChange: this.handleChangeEmail,
      value: this.state.email,
      disabled: this.state.lock,
      style: this.state.red == true ? errorChange : {}
    }), React.createElement("input", {
      type: "password",
      name: "password",
      id: "password",
      className: "form__input form__input_password",
      placeholder: "Password",
      disabled: this.state.lock,
      onChange: this.handleChangePassword,
      value: this.state.password
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
    }, this.state.error)), React.createElement("input", {
      type: "submit",
      name: "login_button",
      id: "login_button",
      className: "form__button",
      disabled: this.state.lock,
      value: "Login"
    }))));
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));
