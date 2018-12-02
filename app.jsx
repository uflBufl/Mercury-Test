function createPostRequest(login, password) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: login, password: password })
  };
}

async function sendRequest(url, options) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    let errorMessage = json.error;
    if (response.status == 0) errorMessage = "No internet connection";
    if (response.status == 503)
      errorMessage = "Server is temporarily unavailable";
    if (response.status == 400)
      errorMessage = "E-Mail or password is incorrect";
    throw {
      error: errorMessage,
      status: response.status
    };
  }
}

class Panel extends React.Component {
  render() {
    return <div className="block">{this.props.children}</div>;
  }
}

function Logo(props) {
  return <img src="img/w-mercury-development.svg" className="logo" />;
}

class Button extends React.Component {
  render() {
    return (
      <input
        type="submit"
        className={"form__button " + this.props.addClass}
        {...this.props}
      />
    );
  }
}

class Input extends React.Component {
  render() {
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };

    return (
      <input
        className={"form__input " + this.props.addClass}
        style={this.props.isInvalid == true ? errorChange : {}}
        {...this.props}
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
      isSending: false,
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
      isSending: true,
      error: ""
    });

    var login = this.state.email;
    var password = this.state.password;
    var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";

    try {
      const request = createPostRequest(login, password);
      const response = await sendRequest(url, request);

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
          <h1 className="block__headline">Log In</h1>
          <form onSubmit={this.logIn} className="form">
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
              addClass="form__input_password"
            />

            <div
              className="form__error"
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
        </Panel>
      </div>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Panel>
          <form {...this.props}>
            <img src={this.props.user.photoUrl} className="block__img" />

            <h1 className="block__headline block__headline_name" id="UsName">
              {this.props.user.name}
            </h1>

            <Button value="Logout" addClass="form form__button_profile" />
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
    return (
      <div>
        <Logo />

        {this.state.user ? (
          <Profile onSubmit={this.submitLogout} user={this.state.user} />
        ) : (
          <LogIn submitLogin={this.submitLogin} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
