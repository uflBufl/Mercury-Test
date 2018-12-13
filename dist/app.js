import Logo from "./Logo.js";
import Profile from "./Profile.js";
import LogIn from "./LogIn.js";
import { UserContext } from "./user-context.js"; // import { LoginContext } from "./login-context.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitLogout = this.submitLogout.bind(this);
    this.submitLogin = this.submitLogin.bind(this); // this.handleChangeEmail = this.handleChangeEmail.bind(this);
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
  } // handleChangeEmail(e) {
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
    return React.createElement("div", null, React.createElement(Logo, null), React.createElement(UserContext.Provider, {
      value: this.state.user
    }, this.state.user ? React.createElement(Profile, {
      onSubmit: this.submitLogout,
      user: this.state.user
    }) : React.createElement(LogIn, {
      submitLogin: this.submitLogin
    })));
  }

}

// ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));