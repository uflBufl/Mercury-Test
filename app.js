function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

async function login(login, password) {
  var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";
  const params = JSON.stringify({
    email: login,
    password: password
  });
  const response = await post(url, params);
  return response;
}

async function post(url, params) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  };
  const response = await request(url, options);
  return response;
}

async function request(url, options) {
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: params
  // };
  const response = await fetch(url, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    let errorMessage = json.error;
    if (response.status == 0) errorMessage = "No internet connection";
    if (response.status == 503) errorMessage = "Server is temporarily unavailable";
    if (response.status == 400) errorMessage = "E-Mail or password is incorrect";
    throw {
      error: errorMessage,
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

class Button extends React.Component {
  render() {
    return React.createElement("input", _extends({
      type: "submit",
      className: "form__button " + this.props.addClass
    }, this.props));
  }

}

class Input extends React.Component {
  render() {
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };
    return React.createElement("input", _extends({
      className: "form__input " + this.props.addClass,
      style: this.props.isInvalid == true ? errorChange : {}
    }, this.props));
  }

}

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

class Profile extends React.Component {
  render() {
    return React.createElement("div", null, React.createElement(Panel, null, React.createElement("form", this.props, React.createElement("img", {
      src: this.props.user.photoUrl,
      className: "block__img"
    }), React.createElement("h1", {
      className: "block__headline block__headline_name",
      id: "UsName"
    }, this.props.user.name), React.createElement(Button, {
      value: "Logout",
      addClass: "form form__button_profile"
    }))));
  }

}

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
    return React.createElement("div", null, React.createElement(Logo, null), this.state.user ? React.createElement(Profile, {
      onSubmit: this.submitLogout,
      user: this.state.user
    }) : React.createElement(LogIn, {
      submitLogin: this.submitLogin
    }));
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));
