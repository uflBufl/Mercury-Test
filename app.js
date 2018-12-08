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
    return React.createElement("div", null, React.createElement(Logo, null), this.state.user ? React.createElement(Profile, {
      onSubmit: this.submitLogout,
      user: this.state.user
    }) : React.createElement(LogIn, {
      submitLogin: this.submitLogin
    }));
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));
