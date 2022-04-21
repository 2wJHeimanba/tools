


export function setScrollHidden(el:Element,className:string){
    let linkElm = document.createElement("style");
    (el as HTMLElement).style.position = "relative";
    (el as HTMLElement).style.overflow = "hidden";
    linkElm.innerHTML = `
        .${className}{
            margin-right:-17px;
            height:100%;
            overflow:hidden auto;
            max-height:${el.clientHeight}px;
            height:${el.clientHeight}px;
        }
        .vans-scroll-track{
            width: 12px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            background-color: transparent;
            overflow:hidden;
        }
        .vans-scroll-thumb{
            display:inline-block;
            width: 12px;
            border-radius: 6px;
            background: rgba(204,204,204,0.6);
            border: 4px solid transparent;
            background-clip: content-box;
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0;
            user-select: none;
            transition: background-color 0.2s linear;
        }
        .vans-scroll-thumb:hover{
            background-color: rgba(128, 128, 128,0.6);
        }
    `;
    document.head.appendChild(linkElm);
}