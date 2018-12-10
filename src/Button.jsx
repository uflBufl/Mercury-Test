export default class Button extends React.Component {
  render() {
    return (
      <input
        type="submit"
        className={"form__button " + this.props.addClass}
        {...this.props}
      />
    );
  }
}
