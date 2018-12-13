import React from "react";

export const LoginContext = React.createContext({
  email: "",
  password: "",
  changeEmail: () => {},
  changePassword: () => {}
});
