import React from "react";
import Button from "../../components/Button/Button.js";
import Panel from "../../components/Panel/Panel.js";
import { UserContext } from "../../store/user-context.js";
import profile from "./Profile.css";
import buttonProfileStyle from "../../components/Button/Button.css";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <Panel>
          {this.props.user && (
            <form {...this.props} onSubmit={this.props.submitLogout}>
              <img
                src={this.props.user.photoUrl}
                className={profile.block__img}
              />
              <h1
                className={`${profile.block__headline} ${
                  profile.block__headline_name
                }`}
                id="UsName"
              >
                {this.props.user.name}
              </h1>

              <Button
                user="Logout"
                className={`${profile.form} ${
                  buttonProfileStyle.form__button_profile
                }`}
              />
            </form>
          )}
        </Panel>
      </div>
    );
  }
}
