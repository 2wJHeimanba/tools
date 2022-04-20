import { Window } from "../declare-ts"
import { setScrollHidden } from "./tools/set_style"
function Scroll(el:string|Element):void{
    if(typeof el === "string"){
        el = document.querySelector(el)
    }
    let scrollDom:Element|HTMLElement;

    let scrollBoxHeight = el.clientHeight;  //可见区域
    let contentBoxHeight = el.scrollHeight; //内容的全部高度
    if(scrollBoxHeight < contentBoxHeight){ // 判断是否有滚动条
        let parentDom = document.createElement("div");
        parentDom.setAttribute("class","vans-scroll-parent");
        parentDom.appendChild(el);
        let hideDom = document.createElement("div");
        hideDom.setAttribute("class","vans-hide-dom");
        scrollDom = document.createElement("div");
        scrollDom.setAttribute("class","vans-scroll-thumb");
        hideDom.appendChild(scrollDom);
        parentDom.appendChild(hideDom);
        document.body.appendChild(parentDom);
    }
    //滚动条高度
    (scrollDom as HTMLElement).style.height = ((scrollBoxHeight * scrollBoxHeight) / contentBoxHeight) + "px";
    el.addEventListener("scroll",function(){
        let top = (((el as HTMLElement).scrollTop * scrollBoxHeight) / contentBoxHeight) + "px";
        (scrollDom as HTMLElement).style.top = top
    });

}



(window as Window).scroll = Scroll;