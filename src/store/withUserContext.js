import React from "react";
import UserContext from "./user-context.js";

export default function withUserContext(Component) {
  return class ComponentWithUserContext extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </UserContext.Consumer>
      );
    }
  };
}