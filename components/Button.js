import button from "./button.css";

export default class Button extends React.Component {
  render() {

// const button = button.form__button`

// ${
// this.props.addClass
// }
// `;

    return (
      <input
        type="submit"
        className={`${button.form__button} ${this.props.addClass}`}
        {...this.props}
      />
    );
  }
}
