function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default class Button extends React.Component {
  render() {
    return React.createElement("input", _extends({
      type: "submit",
      className: "form__button " + this.props.addClass
    }, this.props));
  }

}