


export function setScrollHidden(el:Element){

    if(document.styleSheets.length < 0){//存在style元素--> 添加

    }else{//不存style元素的--> 创建
        console.log("fjdsklafjdksla")
        let linkElm = document.createElement("style");
        linkElm.innerHTML = `
            .vans-scroll{}
            .vans-scroll::-webkit-scrollbar {
            }
        `;
        document.head.appendChild(linkElm);
    }
}