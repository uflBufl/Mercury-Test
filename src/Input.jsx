export default class Input extends React.Component {
  render() {
    const errorChange = {
      borderColor: "#ed4159",
      color: "#ed4159"
    };

    return (
      <input
        className={"form__input " + this.props.addClass}
        style={this.props.isInvalid == true ? errorChange : {}}
        {...this.props}
      />
    );
  }
}
