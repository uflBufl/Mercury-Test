import React from "react";
import Button from "../../components/Button/Button.js";
import Panel from "../../components/Panel/Panel.js";
import { UserContext } from "../../store/user-context.js";
import styles from "./Profile.css";

 class Profile extends React.Component {
  render() {
    return (
      <div>
        <Panel>
            <form {...this.props} onSubmit={this.props.submitLogout}>
              <img
                src={this.props.user.photoUrl}
                className={styles.block__img}
              />
              <h1
                className={`${styles.block__headline} ${
                  styles.block__headline_name
                }`}
                id="UsName"
              >
                {this.props.user.name}
              </h1>

              <Button
                value="Logout"
                className={`${styles.form} ${
                  styles.form__button_profile
                }`}
              />
            </form>
        </Panel>
      </div>
    );
  }
}

function profileWithUserContext(Component) {
  return class WithUserContext extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </UserContext.Consumer>
      );
    }
  };
}

export { profileWithUserContext, Profile };
