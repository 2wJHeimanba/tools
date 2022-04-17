import { init } from "./init"; 
import { h } from "./h";
import { classModule } from "./modules/class"

let test = h(
  "h2#container",
  {
    class:{styleDemo:true}
  }
  ,[
    h(
      "span",
      "wenjianjia"
    ),
    h(
      "h3.vans",
      ["hello golang"]
    )
  ]
);

let patch = init([
  classModule
]);
let result = patch(document.querySelector("#app"),test);
console.warn(result)
