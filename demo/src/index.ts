import { init } from "./init"; 
import { h } from "./h";
import { classModule } from "./modules/class"
import { styleModule } from "./modules/style"
import { eventListenersModule } from "./modules/eventlisteners"
import { attributesModule } from "./modules/attributes"
import { propsModule } from "./modules/props"

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
  eventListenersModule,
  attributesModule,
  propsModule
]);
let result = patch(document.querySelector("#app"),test);
setTimeout(()=>{
  function testHandler(name:string){
    return h(
      "h1.test-box",
      [
        h(
          "p",
          "wenjianjia"
        ),
        h(
          "p",
          "菜鸟爱抬头"+name
        )
      ]
    )
  }
  const name = "vans";
  let temporary_vnode = h(
    "h2#container",
    {
      class:{styleDemo:true},
      style:{
        color:"#333",
        background:"#ccc"
      }
    }
    ,[
      h(
        "span",
        {
          on:{
            click:(e:any)=>{
              console.log("hello golang",e.target.person)
            }
          },
          attrs:{
            jq:"vans-wen"
          },
          props:{
            person:{
              name:"vans",
              age:121
            }
          }
        },
        "vans"
        // testHandler("hello golang")
      ),
      h(
        "h3.vans",
        ["hello golang"]
      )
    ]
  );
  patch(result,temporary_vnode)
},2000)
