import React from "react";

const UserContext = React.createContext({
  user: {
    name: "",
    photoUrl: ""
  },
  submitLogin: () => {},
  submitLogout: () => {}
});

export default UserContext;