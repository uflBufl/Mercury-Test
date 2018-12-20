import classNames from "classnames";
import React from "react";
import styles from "./Input.css";

export default class Input extends React.Component {
  render() {
    const { className, ...otherProps } = this.props;

    const inputClass = classNames(styles.input, className, {
      [styles.errorChange]: this.props.isInvalid
    });

    return (
      <input
        className={inputClass}
        {...otherProps}
      />
    );
  }
}
