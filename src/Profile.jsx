import Button from "./Button.js";
import Panel from "./Panel.js";
import { UserContext } from "./user-context.js";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <Panel>
          <UserContext.Consumer>
            {value => (
              <form {...this.props}>
                <img src={value.photoUrl} className="block__img" />

                <h1
                  className="block__headline block__headline_name"
                  id="UsName"
                >
                  {value.name}
                </h1>

                <Button value="Logout" addClass="form form__button_profile" />
              </form>
            )}
          </UserContext.Consumer>
        </Panel>
      </div>
    );
  }
}
