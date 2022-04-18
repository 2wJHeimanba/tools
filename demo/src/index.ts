import { init } from "./init"; 
import { h } from "./h";
import { classModule } from "./modules/class"
import { styleModule } from "./modules/style"
import { eventListenersModule } from "./modules/eventlisteners"

let test = h(
  "h2#container",
  {
    class:{styleDemo:true},
    style:{
      color:"cyan"
    }
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
  classModule,
  styleModule,
  eventListenersModule
]);
let result = patch(document.querySelector("#app"),test);
setTimeout(()=>{
  const name = "vans";
  let temporary_vnode = h(
    "h2#container",
    {
      class:{styleDemo:true},
      style:{
        color:"red",
        background:"pink"
      }
    }
    ,[
      h(
        "span",
        {
          on:{
            click:(name)=>{
              console.log("hello golang",name)
            }
          }
        },
        "wenjianjia"
      ),
      h(
        "h3.vans",
        ["hello golang"]
      )
    ]
  );
  patch(result,temporary_vnode)
},2000)
