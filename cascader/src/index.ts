import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom"

const patch = init([
    // 通过传入模块初始化 patch 函数
    classModule, // 开启 classes 功能
    propsModule, // 支持传入 props
    styleModule, // 支持内联样式同时支持动画
    eventListenersModule, // 添加事件监听
]);

const container = document.getElementById("app");

function someFn(){
    console.log("fdsklajffdsafdklds")
    const vnode1 = h("div#container.two.classes", { on: { click: someFn } }, [
        h("span", { style: { fontWeight: "bold" } }, "This is bold"),
        " and this is just hello golang normal text",
        h("a", { props: { href: "/foo" } }, "I'll take you places!"),
    ]);
    patch(vnode,vnode1)
}

const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
    h("span", { style: { fontWeight: "bold" } }, "This is bold"),
    " and this is just normal text",
    h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
 // 传入一个空的元素节点 - 将产生副作用（修改该节点）
patch(container, vnode);