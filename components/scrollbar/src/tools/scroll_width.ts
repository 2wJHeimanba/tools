
// 获取浏览器滚动条的宽度
export const scrollWidth = (():number=>{

    const outer:HTMLDivElement = document.createElement("div");
    outer.className = "vans-scrollbar_wrap";
    outer.style.cssText = `
        visibility:hidden;
        width:100px;
        position:absolute;
        top:-99999px;
    `;
    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";

    const inner:HTMLDivElement = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    const widthWidthScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWidthScroll

})();