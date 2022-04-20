function Scroll(el) {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }
    var scrollDom;
    var scrollParentDom;
    var scrollBoxHeight = el.clientHeight; //可见区域
    var contentBoxHeight = el.scrollHeight; //内容的全部高度
    if (scrollBoxHeight < contentBoxHeight) { // 判断是否有滚动条
        scrollParentDom = document.createElement("div");
        scrollParentDom.setAttribute("class", "vans-scroll-parent");
        scrollParentDom.appendChild(el);
        var hideDom = document.createElement("div");
        hideDom.setAttribute("class", "vans-hide-dom");
        scrollDom = document.createElement("div");
        scrollDom.setAttribute("class", "vans-scroll-thumb");
        hideDom.appendChild(scrollDom);
        scrollParentDom.appendChild(hideDom);
        document.body.appendChild(scrollParentDom);
    }
    //滚动条高度
    scrollDom.style.height = ((scrollBoxHeight * scrollBoxHeight) / contentBoxHeight) + "px";
    el.addEventListener("scroll", function () {
        var top = ((el.scrollTop * scrollBoxHeight) / contentBoxHeight) + "px";
        scrollDom.style.top = top;
    });
    scrollParentDom.addEventListener("mouseenter", function () {
        setTimeout(function () {
            var temporaryOpacity = 0;
            var timein = setInterval(function () {
                temporaryOpacity += 0.015;
                if (temporaryOpacity >= 1) {
                    clearInterval(timein);
                    temporaryOpacity = 1;
                }
                scrollDom.style.setProperty("opacity", "".concat(temporaryOpacity.toFixed(2)));
            }, 4);
        }, 300);
    });
    scrollParentDom.addEventListener("mouseleave", function () {
        setTimeout(function () {
            var temporaryOpacity = 1;
            var timeout = setInterval(function () {
                temporaryOpacity -= 0.015;
                if (temporaryOpacity <= 0) {
                    clearInterval(timeout);
                    temporaryOpacity = 0;
                }
                scrollDom.style.setProperty("opacity", "".concat(temporaryOpacity.toFixed(2)));
            }, 4);
        }, 300);
    });
    scrollDom.addEventListener("mousedown", function () {
        console.log("wenjfkdls");
    });
}
window.scroll = Scroll;
