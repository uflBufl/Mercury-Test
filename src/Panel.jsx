export default class Panel extends React.Component {
  render() {
    return <div className="block">{this.props.children}</div>;
  }
}