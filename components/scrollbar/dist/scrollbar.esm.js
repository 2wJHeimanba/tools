function Scroll(el) {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }
    var scrollDom;
    var scrollBoxHeight = el.clientHeight; //可见区域
    var contentBoxHeight = el.scrollHeight; //内容的全部高度
    if (scrollBoxHeight < contentBoxHeight) { // 判断是否有滚动条
        var parentDom = document.createElement("div");
        parentDom.setAttribute("class", "vans-scroll-parent");
        parentDom.appendChild(el);
        var hideDom = document.createElement("div");
        hideDom.setAttribute("class", "vans-hide-dom");
        scrollDom = document.createElement("div");
        scrollDom.setAttribute("class", "vans-scroll-thumb");
        hideDom.appendChild(scrollDom);
        parentDom.appendChild(hideDom);
        document.body.appendChild(parentDom);
    }
    //滚动条高度
    scrollDom.style.height = ((scrollBoxHeight * scrollBoxHeight) / contentBoxHeight) + "px";
    el.addEventListener("scroll", function () {
        var top = ((el.scrollTop * scrollBoxHeight) / contentBoxHeight) + "px";
        scrollDom.style.top = top;
    });
}
window.scroll = Scroll;
