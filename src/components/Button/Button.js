import React from "react";
import button from "./Button.css";

export default class Button extends React.Component {
  render() {

// const button = button.form__button`

// ${
// this.props.addClass
// }
// `;

    return (
      <input
        type="submit"
        className={`${button.form__button} ${this.props.addClass}`}
        {...this.props}
      />
    );
  }
}
