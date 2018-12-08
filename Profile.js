import Button from "./Button.js";
import Panel from "./Panel.js";

export default class Profile extends React.Component {
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