import { Window } from "../declare-ts"
import { setScrollHidden } from "./tools/set_style"
function Scroll(el:string|Element):void{
    if(typeof el === "string"){
        el = document.querySelector(el)
    }
    let scrollDom:Element|HTMLElement;
    let scrollParentDom:Element|HTMLElement;

    let scrollBoxHeight = el.clientHeight;  //可见区域
    let contentBoxHeight = el.scrollHeight; //内容的全部高度
    if(scrollBoxHeight < contentBoxHeight){ // 判断是否有滚动条
        scrollParentDom = document.createElement("div");
        scrollParentDom.setAttribute("class","vans-scroll-parent");
        scrollParentDom.appendChild(el);
        let hideDom = document.createElement("div");
        hideDom.setAttribute("class","vans-hide-dom");
        scrollDom = document.createElement("div");
        scrollDom.setAttribute("class","vans-scroll-thumb");
        hideDom.appendChild(scrollDom);
        scrollParentDom.appendChild(hideDom);
        document.body.appendChild(scrollParentDom);
    }
    //滚动条高度
    (scrollDom as HTMLElement).style.height = ((scrollBoxHeight * scrollBoxHeight) / contentBoxHeight) + "px";
    el.addEventListener("scroll",function(){
        let top = (((el as HTMLElement).scrollTop * scrollBoxHeight) / contentBoxHeight) + "px";
        (scrollDom as HTMLElement).style.top = top
    });

    scrollParentDom.addEventListener("mouseenter",function(){//进入显示滚动条
        setTimeout(()=>{
            let temporaryOpacity:number = 0;
            let timein = setInterval(()=>{
                temporaryOpacity += 0.015;
                if(temporaryOpacity >= 1){
                    clearInterval(timein);
                    temporaryOpacity = 1;
                }
                (scrollDom as HTMLElement).style.setProperty("opacity",`${temporaryOpacity.toFixed(2)}`);
            },4);
        },300)
    });

    scrollParentDom.addEventListener("mouseleave",function(){//离开隐藏滚动条
        setTimeout(()=>{
            let temporaryOpacity:number = 1;
            let timeout = setInterval(()=>{
                temporaryOpacity -= 0.015;
                if(temporaryOpacity <= 0){
                    clearInterval(timeout);
                    temporaryOpacity = 0;
                }
                (scrollDom as HTMLElement).style.setProperty("opacity",`${temporaryOpacity.toFixed(2)}`);
            },4);
        },300);        
    });

    scrollDom.addEventListener("mousedown",function(){
        console.log("wenjfkdls")
    })

}



(window as Window).scroll = Scroll;