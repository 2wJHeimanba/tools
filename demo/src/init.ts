import { DOMAPI, htmlDomApi } from "./htmldomapi";
import { Module } from "./modules/module";
import { vnode } from "./vnode";

export type Options = {
    experimental?:{
        fragments?:boolean
    }
}
const hooks:Array<keyof Module> = [
    "create",
    "update",
    "remove",
    "destroy",
    "pre",
    "post"
]
type ArraysOf<T> = {
    [K in keyof T]:Array<T[K]>
}
type ModuleHooks = ArraysOf<Required<Module>>

export function init(
    modules:Array<Partial<Module>>,
    domApi?:DOMAPI,
    options?:Options
){
    const cbs:ModuleHooks = {
        create:[],
        update:[],
        remove:[],
        destroy:[],
        pre:[],
        post:[]
    };
    const api:DOMAPI = domApi !== undefined ? domApi : htmlDomApi;
    for(const hook of hooks){
        for(const module of modules){
            const currentHook = module[hook];
            if(currentHook !== undefined){
                (cbs[hook] as any[]).push(currentHook)
            }
        }
    }

    // 将真实dom转成虚拟dom
    function emptyNodeAt(elm:Element) {
        const id = elm.id ? "#"+elm.id : "";
        const classes = elm.getAttribute("class");
        const c = classes ? "." + classes.split(" ").join(".") : "";
        return vnode(
            api.tagName(elm).toLowerCase() + id + c,
            {},
            [],
            undefined,
            elm
        )
    }

    function emptyDocumentFragmentAr(frag:DocumentFragment){
        return vnode(undefined,{},[],undefined,frag)
    }

    // 删除真实dom
    function createRmCb(childElm:Node,listeners:number){
        return function rmCb(){
            if(--listeners === 0){
                const parent = api.parentNode(childElm) as Node;
                api.removeChild(parent,childElm);
            }
        }
    }
}