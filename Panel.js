export default class Panel extends React.Component {
    render() {
      return React.createElement("div", {
        className: "block"
      }, this.props.children);
    }
  
  }