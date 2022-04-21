import { Window } from "../declare-ts"
import { setScrollHidden } from "./tools/set_style"
function Scroll(el:string|Element,className:string="vans-scroll-box123"):void{
    if(typeof el === "string"){
        el = document.querySelector(el) as HTMLElement
    }else{
        el = el as HTMLElement
    }
    let scrollDom:Element|HTMLElement;          //滚动条
    let scrollParentDom:Element|HTMLElement;    //父元素
    let hideDom:Element|HTMLElement;            //滚动条父元素
    let scrollToggle:boolean = true;            //滚动条的显示与隐藏
    let scrollThumbHeight:number;

    let scrollBoxHeight = el.clientHeight;  //可见区域
    let contentBoxHeight = el.scrollHeight; //内容的全部高度
    if(scrollBoxHeight < contentBoxHeight){ // 判断是否有滚动条
        setScrollHidden(el,className);
        scrollParentDom = document.createElement("div");//数据的父元素
        scrollParentDom.setAttribute("class",className);
        let temporaryChild = Array.prototype.slice.call(el.children);
        temporaryChild.forEach((item:Element)=>scrollParentDom.appendChild(item));
        el.appendChild(scrollParentDom);
        hideDom = document.createElement("div");        //滚动条轨道
        hideDom.setAttribute("class","vans-scroll-track");
        scrollDom = document.createElement("div");      //滚动条滑块
        scrollDom.setAttribute("class","vans-scroll-thumb");
        hideDom.appendChild(scrollDom);
        el.appendChild(hideDom);
    }else{
        return
    }
    //滚动条高度
    scrollThumbHeight = ((scrollBoxHeight * scrollBoxHeight) / contentBoxHeight);
    (scrollDom as HTMLElement).style.height = scrollThumbHeight + "px";
    scrollParentDom.addEventListener("scroll",function(e:any){
        let top = ((scrollParentDom as HTMLElement).scrollTop * scrollBoxHeight) / contentBoxHeight;
        if((scrollThumbHeight + top) <= (el as HTMLElement).clientHeight){
            (scrollDom as HTMLElement).style.top = top + "px";
        }
    });

    el.addEventListener("mouseenter",function(){//进入显示滚动条
        if(!scrollToggle){
            return;
        }
        setTimeout(()=>{
            scrollShowHandler();
        },300)
    });

    el.addEventListener("mouseleave",function(){//离开隐藏滚动条
        if(!scrollToggle){
            return;
        }
        setTimeout(()=>{
            scrollHideHandler();
        },300); 
    });

    window.addEventListener("mousedown",function(e:any){
        if(e.target === scrollDom){
            scrollToggle = false;
            window.addEventListener("mousemove",mouseMoveHandler)
        }
    });
    window.addEventListener("mouseup",function(e:any){
        scrollToggle = true;
        if(!(el as HTMLElement).contains(e.target)){
            scrollHideHandler();
        }
        window.removeEventListener("mousemove",mouseMoveHandler)
    });

    // 滚动条的显示
    function scrollShowHandler(){
        let temporaryOpacity:number = 0;
        let timein = setInterval(()=>{
            temporaryOpacity += 0.015;
            if(temporaryOpacity >= 1){
                clearInterval(timein);
                temporaryOpacity = 1;
            }
            (scrollDom as HTMLElement).style.setProperty("opacity",`${temporaryOpacity.toFixed(2)}`);
        },4);
    }

    // 滚动条隐藏
    function scrollHideHandler(){
        let temporaryOpacity:number = 1;
        let timeout = setInterval(()=>{
            temporaryOpacity -= 0.015;
            if(temporaryOpacity <= 0){
                clearInterval(timeout);
                temporaryOpacity = 0;
            }
            (scrollDom as HTMLElement).style.setProperty("opacity",`${temporaryOpacity.toFixed(2)}`);
        },4);
    }

    //鼠标移动处理
    function mouseMoveHandler(e:any){
        let scrollDomTop:number = parseFloat(window.getComputedStyle(scrollDom).top) + e.movementY;
        if(((scrollThumbHeight + scrollDomTop) <= (el as HTMLElement).clientHeight) && scrollDomTop >= 0){
            (scrollDom as HTMLElement).style.top = scrollDomTop + "px";
            (scrollParentDom as HTMLElement).scrollTop = (contentBoxHeight * scrollDomTop) / scrollBoxHeight;
        }
    }
}

(window as Window).scroll = Scroll;