
import { h } from "./h";

let test = h(
  "div",
  {
    style:{color:"red"}
  }
  ,h(
    "span",
    "wenjianjia"
  )
);

console.log(test,"result")
