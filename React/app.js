// function InputEmailFunction() {
//   return (
//     <input
//       type="email"
//       name="login"
//       id="login"
//       className="form__input"
//       placeholder="E-Mail"
//     />
//   );
// }

// function InputPasswordFunction() {
//   return (
//     <input
//       type="password"
//       name="password"
//       id="password"
//       className="form__input form__input_password"
//       placeholder="Password"
//     />
//   );
// }

// function ErrorFunction() {
//   return (
//     <div className="form__error" id="error" name="error">
//       <span id="errortext" name="errortext">
//         E-Mail or password is incorrect
//       </span>
//     </div>
//   );
// }

// function ButtonFunction() {
//   return (
//     <input
//       type="submit"
//       name="login_button"
//       id="login_button"
//       className="form__button"
//       value="Login"
//     />
//   );
// }

// function BlockFunction() {
//   return (
//     <div className="block">
//       <h1 className="block__headline">Log In</h1>
//       <form className="form">
//         <InputEmailFunction />
//         <InputPasswordFunction />
//         <ErrorFunction />
//         <ButtonFunction />
//       </form>
//     </div>
//   );
// }

// ReactDOM.render(
//   <div>
//     <img src="img/w-mercury-development.svg" className="logo" />

//     <BlockFunction />
//   </div>,
//   document.getElementById("root")
// );

("use strict");

function InputEmailFunction() {
  return React.createElement("input", {
    type: "email",
    name: "login",
    id: "login",
    className: "form__input",
    placeholder: "E-Mail"
  });
}

function InputPasswordFunction() {
  return React.createElement("input", {
    type: "password",
    name: "password",
    id: "password",
    className: "form__input form__input_password",
    placeholder: "Password"
  });
}

function ErrorFunction() {
  return React.createElement(
    "div",
    {
      className: "form__error",
      id: "error",
      name: "error"
    },
    React.createElement(
      "span",
      { id: "errortext", name: "errortext" },
      "E-Mail or password is incorrect"
    )
  );
}

function ButtonFunction() {
  return React.createElement("input", {
    type: "submit",
    name: "login_button",
    id: "login_button",
    className: "form__button",
    value: "Login"
  });
}

function BlockFunction() {
  return React.createElement(
    "div",
    { className: "block" },
    React.createElement("h1", { className: "block__headline" }, "Log In"),
    React.createElement(
      "form",
      { className: "form" },
      React.createElement(InputEmailFunction, null),
      React.createElement(InputPasswordFunction, null),
      React.createElement(ErrorFunction, null),
      React.createElement(ButtonFunction, null)
    )
  );
}

ReactDOM.render(
  React.createElement(
    "div",
    null,
    React.createElement("img", {
      src: "img/w-mercury-development.svg",
      className: "logo"
    }),
    React.createElement(BlockFunction, null)
  ),
  document.getElementById("root")
);
