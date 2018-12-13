import panel from "./panel.css";

export default class Panel extends React.Component {
  render() {
    return <div className = {panel.block}>{this.props.children}</div>;
  }
}