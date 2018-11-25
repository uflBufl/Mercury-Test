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
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="block">{this.props.children}</div>;
  }
}

function Logo(props) {
  return <img src="img/w-mercury-development.svg" className="logo" />;
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
    return (
      <input
        type="submit"
        className={
          this.props.form == "login"
            ? "form__button"
            : "form form__button form__button_profile"
        }
        disabled={this.props.isDisabled}
        value={this.props.form == "login" ? "Login" : "Logout"}
      />
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      value: this.props.value
    };

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

    return (
      <input
        onClick={this.props.removeInvalid}
        type={this.state.type}
        className={
          this.props.type == "password"
            ? "form__input form__input_password"
            : "form__input"
        }
        placeholder={this.props.type == "password" ? "Password" : "E-Mail"}
        disabled={this.props.isDisabled}
        onChange={this.handleChangeValue}
        value={this.props.value}
        style={this.props.isInvalid == true ? errorChange : {}}
      />
    );
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
    return (
      <div>
        <Logo />

        <Panel>
          <h1 className="block__headline">Log In</h1>
          <form onSubmit={this.logIn} className="form">
            <Input
              type="email"
              removeInvalid={this.removeInvalid}
              value="user@example.com"
              isInvalid={this.state.isInvalid}
              isDisabled={this.state.isDisabled}
              handleChangeValue={this.handleChangeEmail}
            />

            <Input
              type="password"
              value={this.state.password}
              isDisabled={this.state.isDisabled}
              handleChangeValue={this.handleChangePassword}
            />

            <div
              className="form__error"
              id="error"
              name="error"
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

            <Button form="login" isDisabled={this.state.isDisabled} />
          </form>
        </Panel>
      </div>
    );
  }
}

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Logo />

        <Panel>
          <form
            action="login.html"
            method="GET"
            onSubmit={this.props.clickLogout}
          >
            <img
              src={this.props.user.photoUrl}
              className="block__img"
              id="photo"
            />

            <h1 className="block__headline block__headline_name" id="UsName">
              {this.props.user.name}
            </h1>

            <Button form="logout" />
          </form>
        </Panel>
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
      return <LogOut clickLogout={this.clickLogout} user={this.state.user} />;
    }
    return <LogIn clickLogin={this.clickLogin} />;
  }
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector("#root")
);
