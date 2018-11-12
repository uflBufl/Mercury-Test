// function InputEmailFunction() {
//   return <input type="email" name="login" id = "login" className = "InputEmail InputText AllText" placeholder="E-Mail" /> ;
// }

// function InputPasswordFunction() {
//   return <input type="password" name="password" id = "password" className = "InputEmail InputPassword InputText AllText" placeholder="Password" /> ;
// }

// function ErrorFunction() {
//   return <div className = "InputPassword ErrorText AllText NewError" id = "error" name="error">
//         <span id = "errortext" name = "errortext">E-Mail or password is incorrect</span>
//       </div> ;
// }

// function ButtonFunction() {
//   return <input type="submit" name="login_button" id = "login_button" className = "Button ButtonText AllText" value = "Login" /> ;
// }

// function BlockFunction() {
//   return <div className="Block">
//       <h1 className = "Head">Log In</h1>
//       <form>

//           <InputEmailFunction />
//           <InputPasswordFunction />
//           <ErrorFunction />
//           <ButtonFunction />

//       </form>

//     </div> ;
// }

// ReactDOM.render(
//   <div>
//     <img src="img/w-mercury-development.svg"
//     className="W-Mercury-Development" />

//           <BlockFunction />

//   </div>,
//   document.getElementById("root")
//   );




"use strict";

function InputEmailFunction() {
  return React.createElement("input", { type: "email", name: "login", id: "login", className: "InputEmail InputText AllText", placeholder: "E-Mail" });
}

function InputPasswordFunction() {
  return React.createElement("input", { type: "password", name: "password", id: "password", className: "InputEmail InputPassword InputText AllText", placeholder: "Password" });
}

function ErrorFunction() {
  return React.createElement(
    "div",
    { className: "InputPassword ErrorText AllText NewError", id: "error", name: "error" },
    React.createElement(
      "span",
      { id: "errortext", name: "errortext" },
      "E-Mail or password is incorrect"
      )
    );
}

function ButtonFunction() {
  return React.createElement("input", { type: "submit", name: "login_button", id: "login_button", className: "Button ButtonText AllText", value: "Login" });
}

function BlockFunction() {
  return React.createElement(
    "div",
    { className: "Block" },
    React.createElement(
      "h1",
      { className: "Head" },
      "Log In"
      ),
    React.createElement(
      "form",
      null,
      React.createElement(InputEmailFunction, null),
      React.createElement(InputPasswordFunction, null),
      React.createElement(ErrorFunction, null),
      React.createElement(ButtonFunction, null)
      )
    );
}

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement("img", { src: "img/w-mercury-development.svg",
    className: "W-Mercury-Development" }),
  React.createElement(BlockFunction, null)
  ), document.getElementById("root"));

