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

function LogoFunction(props) {
  return <img src="img/w-mercury-development.svg" className="logo" />;
}

function LogoutImgFunction(props) {
  return <img src={props.user.photoUrl} className="block__img" id="photo" />;
}

function LogoutHeadFunction(props) {
  return (
    <h1 className="block__headline block__headline_name" id="UsName">
      {props.user.name}
    </h1>
  );
}

class LogoutHeadClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 className="block__headline block__headline_name" id="UsName">
        {this.props.user.name}
      </h1>
    );
  }
}

class LogoutButtonClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type="submit"
        className="form form__button form__button_profile"
        value="Logout"
      />
    );
  }
}

class LoginButtonClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      IsLock: false
    };
  }

  render() {
    return (
      <input
        type="submit"
        name="login_button"
        id="login_button"
        className="form__button"
        disabled={this.props.IsLock}
        value="Login"
      />
    );
  }
}

class ErrorClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="form__error"
        id="error"
        name="error"
        style={
          !this.props.error == ""
            ? { display: "inline-block" }
            : { display: "none" }
        }
      >
        <span id="errortext" name="errortext">
          {this.props.error}
        </span>
      </div>
    );
  }
}

class InputPasswordClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: this.props.password,
      IsLock: false
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword(e) {
    this.props.handleChangePassword(e);
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <input
        type="password"
        name="password"
        id="password"
        className="form__input form__input_password"
        placeholder="Password"
        disabled={this.props.IsLock}
        onChange={this.handleChangePassword}
        value={this.props.password}
      />
    );
  }
}

class InputLoginClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "user@example.com",
      IsLock: this.props.IsLock,
      IsRed: this.props.IsRed
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleChangeEmail(e) {
    this.props.handleChangeEmail(e);
    this.setState({
      email: e.target.value
    });
  }

  render() {
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };

    return (
      <input
        onClick={this.props.removeRedColor}
        type="email"
        name="login"
        id="login"
        className="form__input"
        placeholder="E-Mail"
        onChange={this.handleChangeEmail}
        value={this.state.email}
        disabled={this.props.IsLock}
        style={this.props.IsRed == true ? errorChange : {}}
      />
    );
  }
}

class LogInClass extends React.Component {
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
        body: JSON.stringify({ email: login, password: password })
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
    return (
      <div>
        <LogoFunction />

        <div className="block">
          <h1 className="block__headline">Log In</h1>
          <form onSubmit={this.logIn} className="form">
            {React.createElement(InputLoginClass, {
              removeRedColor: this.removeRedColor,
              IsRed: this.state.IsRed,
              IsLock: this.state.IsLock,
              handleChangeEmail: this.handleChangeEmail
            })}

            {React.createElement(InputPasswordClass, {
              password: this.state.password,
              IsLock: this.state.IsLock,
              handleChangePassword: this.handleChangePassword
            })}

            {React.createElement(ErrorClass, { error: this.state.error })}

            {React.createElement(LoginButtonClass, { lock: this.state.IsLock })}
          </form>
        </div>
      </div>
    );
  }
}

class LogOutClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LogoFunction />

        <div className="block">
          <form
            action="login.html"
            method="GET"
            onSubmit={this.props.clickLogout}
          >
            <LogoutImgFunction user={this.props.user} />

            <LogoutHeadFunction user={this.props.user} />

            {React.createElement(LogoutButtonClass)}
          </form>
        </div>
      </div>
    );
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
      return React.createElement(LogOutClass, {
        user: this.state.user,
        clickLogout: this.clickLogout
      });
    }
    return React.createElement(LogInClass, { clickLogin: this.clickLogin });
  }
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector("#root")
);
