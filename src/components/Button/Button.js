import React from "react";
import button from "./Button.css";

export default class Button extends React.Component {
  render() {
    const { className, ...otherProps } = this.props;

    return (
      <input
        type="submit"
        className={`${button.form__button} ${className}`}
        {...otherProps}
      />
    );
  }
}
