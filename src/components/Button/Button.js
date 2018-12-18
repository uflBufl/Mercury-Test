var classNames = require("classnames");
import React from "react";
import button from "./Button.css";

export default class Button extends React.Component {
  render() {
    const { className, ...otherProps } = this.props;

    var buttonClass = classNames(button.form__button, `${className}`);

    return (
      <input
        type="submit"
        className={buttonClass}
        {...otherProps}
      />
    );
  }
}
