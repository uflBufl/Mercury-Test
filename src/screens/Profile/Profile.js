import React from "react";
import Button from "../../components/Button/Button.js";
import Panel from "../../components/Panel/Panel.js";
import withUserContext from "../../store/withUserContext.js";
import styles from "./Profile.css";

 class Profile extends React.Component {
  render() {
    return (
      <div>
        <Panel>
            <form {...this.props} onSubmit={this.props.submitLogout}>
              <img
                src={this.props.user.photoUrl}
                className={styles.img}
              />
              <h1
                className={`${styles.headline} ${
                  styles.headline_name
                }`}
                id="UsName"
              >
                {this.props.user.name}
              </h1>

              <Button
                value="Logout"
                className={`${styles.button__text} ${
                  styles.button_profile
                }`}
              />
            </form>
        </Panel>
      </div>
    );
  }
}

const ProfileWithUserContext = withUserContext(Profile);
export default ProfileWithUserContext;
