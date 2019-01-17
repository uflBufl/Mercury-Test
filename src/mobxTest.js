import ReactDOM from "react-dom";
import React from "react";

import { observable, decorate, computed, mobx } from "mobx"

export class Todo {
  qwer = 1;
  @observable title = "";
    // title = "";
  @observable finished = false;

//   constructor() {
//     mobx.autorun(() => console.log(1))
// }

  newTitle(t){
    this.title = t;
  }

//   @computed report() {
//     console.log(2); 
// }

}
// decorate(Todo, {
// title:observable,
// finished: observable
// });

// export Todo;