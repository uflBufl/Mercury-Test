function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default class Input extends React.Component {
    render() {
      const errorChange = {
        borderColor: "#ed4159",
        color: "#ed4159"
      };
      return React.createElement("input", _extends({
        className: "form__input " + this.props.addClass,
        style: this.props.isInvalid == true ? errorChange : {}
      }, this.props));
    }
  
  }