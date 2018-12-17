import React from "react";
import input from "./Input.css";

export default class Input extends React.Component {
  render() {
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };

    const { className, ...otherProps } = this.props;

    return (
      <input
        className={`${input.form__input} ${className}`}
        style={this.props.isInvalid == true ? errorChange : {}}
        {...otherProps}
      />
    );
  }
}
