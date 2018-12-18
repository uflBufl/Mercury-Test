var classNames = require("classnames");
import React from "react";
import input from "./Input.css";

// var cx = classNames.bind(input);

export default class Input extends React.Component {
  render() {
    const { className, ...otherProps } = this.props;

    // const f = "input.errorChange";
    // const c = this.props.isInvalid;
    // const g = "className";
    // var inputClass =  input.form__input;
    // if (className) inputClass += {className};
    // if (this.props.isInvalid) inputClass += input.errorChange;

    var inputClass = classNames(input.form__input, `${className}`);
    if (this.props.isInvalid)
      inputClass = classNames(
        input.form__input,
        `${className}`,
        input.errorChange
      );

    // var cx = classNames.bind(input);

    // let className = cx({
    //   base: true,
    //   inProgress: this.props.store.submissionInProgress,
    //   error: this.props.store.errorOccurred,
    //   disabled: this.props.form.valid,
    // });

    // var inputClass = classNames(input.form__input);

    return (
      <input

        // className={`${input.form__input} ${className}`}

        className={inputClass}
        {...otherProps}
      />
    );
  }
}
