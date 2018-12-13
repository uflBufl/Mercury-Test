import Button from "../components/Button.js";
import Panel from "../components/Panel.js";
import { UserContext } from "../store/user-context.js";
import profile from "./profile.css";
import buttonProfileStyle from "../components/button.css";

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
