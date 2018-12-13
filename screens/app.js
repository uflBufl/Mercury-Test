import Logo from "../components/Logo.js";
import Profile from "./Profile.js";
import LogIn from "./LogIn.js";
import { UserContext } from "../store/user-context.js";
import "../style.css";
// import { LoginContext } from "./login-context.js";

// const BrowserRouter = require('react-router-dom').BrowserRouter
// const Route = require('react-router-dom').Route
// const Link = require('react-router-dom').Link



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.submitLogout = this.submitLogout.bind(this);
    this.submitLogin = this.submitLogin.bind(this);

    // this.handleChangeEmail = this.handleChangeEmail.bind(this);
    // this.handleChangePassword = this.handleChangePassword.bind(this);
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

  // handleChangeEmail(e) {
  //   this.setState({
  //     email: e.target.value
  //   });
  // }

  // handleChangePassword(e) {
  //   this.setState({
  //     password: e.target.value
  //   });
  // }

  /*
  передача данных о пльзователе мне кажется
  единственным нормальным вариантом использования контекста в этом коде
  я так понял, что для изменения значений, надо менять стейт функций(также как и с props)
  но в контексте её не получается передавать, т.к. она сразу же используется в следующем компоненте
  и я так понял, что здесь стоит оставить её в props.

  я пытался также сделать передачу email и password в Login, но они также сразу используются в следующих компонентах
  и я их также оставил в props.
  хотя можно было бы реализовать получение их контекста в инпуте, 
  но тогда он теряет свою общность компонента.

  не исключаю, что я что то неправильно понял или не заметил
  */
  render() {
    return (
      <div>
        <Logo />
        {/* <LoginContext.Provider
          value={{
            email: this.state.email,
            password: this.state.password,
            changeEmail: this.handleChangeEmail,
            changePassword: this.handleChangePassword
          }}
        > */}
        <UserContext.Provider value={this.state.user}>
          {this.state.user ? (
            <Profile onSubmit={this.submitLogout} user={this.state.user} />
          ) : (
            <LogIn submitLogin={this.submitLogin} />
          )}
        </UserContext.Provider>
        {/* </LoginContext.Provider> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
