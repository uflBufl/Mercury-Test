import classNames from "classnames";
import React from "react";
import styles from "./Button.css";

export default class Button extends React.Component {
  render() {
    const { className, ...otherProps } = this.props;

    const buttonClass = classNames(styles.button, className);

    return (
      <input
        type="submit"
        className={buttonClass}
        {...otherProps}
      />
    );
  }
}
