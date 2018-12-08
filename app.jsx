import Logo from "./Logo.js";
import Profile from "./Profile.js";
import LogIn from "./LogIn.js";

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
