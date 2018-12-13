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
          <UserContext.Consumer>
            {value => (
              <form {...this.props}>
                <img src={value.photoUrl} className={profile.block__img} />

                <h1
                  className={`${profile.block__headline} ${profile.block__headline_name}`}
                  id="UsName"
                >
                  {value.name}
                </h1>

                <Button value="Logout" addClass={`${profile.form} ${buttonProfileStyle.form__button_profile}`} />
              </form>
            )}
          </UserContext.Consumer>
        </Panel>
      </div>
    );
  }
}
