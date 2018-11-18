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
        body: JSON.stringify({ email: login, password: password })
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
      return (
        <div>
          <img src="img/w-mercury-development.svg" className="logo" />

          <div className="block">
            <form action="login.html" method="GET" onSubmit={this.logout}>
              <img
                src={this.state.user.photoUrl}
                className="block__img"
                id="photo"
              />

              <h1 className="block__headline block__headline_name" id="UsName">
                {this.state.user.name}
              </h1>

              <input
                type="submit"
                onClick={this.logout}
                className="form form__button form__button_profile"
                value="Logout"
              />
            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        <img src="img/w-mercury-development.svg" className="logo" />

        <div className="block">
          <h1 className="block__headline">Log In</h1>
          <form onSubmit={this.logIn} className="form">
            <input
              onClick={this.remove}
              type="email"
              name="login"
              id="login"
              className="form__input"
              placeholder="E-Mail"
              onChange={this.handleChangeEmail}
              value={this.state.email}
              disabled={this.state.lock}
              style={this.state.red == true ? errorChange : {}}
            />

            <input
              type="password"
              name="password"
              id="password"
              className="form__input form__input_password"
              placeholder="Password"
              disabled={this.state.lock}
              onChange={this.handleChangePassword}
              value={this.state.password}
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

            <input
              type="submit"
              name="login_button"
              id="login_button"
              className="form__button"
              disabled={this.state.lock}
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector("#root")
);
