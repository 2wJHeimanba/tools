import { DOMAPI, htmlDomApi } from "./htmldomapi";
import { Module } from "./modules/module";
import { VNode, vnode } from "./vnode";
import * as is from "./is"

export type Options = {
    experimental?:{
        fragments?:boolean
    }
}

type NonUndefined<T> = T extends undefined ? never : T;

// 判断是undefined
function isUndef(s:any):boolean{
    return s === undefined
}
// 判断不是undefined
function isDef<A>(s:A):s is NonUndefined<A>{
    return s !== undefined
}

// 判断是不是同一个dom
function sameVnode(vnode1:VNode,vnode2:VNode):boolean{
    const isSameKey = vnode1.key === vnode2.key;
    const isSameIs = vnode1.data?.is === vnode2.data?.is;
    const isSameSel = vnode1.sel === vnode2.sel;
    return isSameIs && isSameKey && isSameSel
}


function createKeyToOldIdx(
    children:VNode[],
    beginIdx:number,
    endIdx:number
):KeyToIndexMap{
    const map:KeyToIndexMap = {};
    for(let i = beginIdx;i <= endIdx;++i){
        const key = children[i].key;
        if(key !== undefined){
            map[key as string] = i;
        }
    }
    return map
}

// 判断是不是元素节点
function isElement(
    api:DOMAPI,
    vnode:DocumentFragment | VNode | Element
):vnode is Element{
    return api.isElement(vnode as any)
}

// 判断是不是documentFragment节点
function isDocumentFragment(
    api:DOMAPI,
    vnode:DocumentFragment | VNode
):vnode is DocumentFragment {
    return api.isDocumentFragment(vnode as any)
}

function emptyDocumentFragmentAt(frag:DocumentFragment){
    return vnode(undefined,{},[],undefined,frag)
}

type VNodeQueue = VNode[];
const emptyNode = vnode("",{},[],undefined,undefined);
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
type ModuleHooks = ArraysOf<Required<Module>>;
type KeyToIndexMap = {[key:string]:number};

function documentFragmentIsNotSupported():never{
    throw new Error("The document fragment is not supported on this platform.")
}

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

    // 创建真实dom
    function createElm(vnode:VNode,insertedVnodeQueue:VNodeQueue):Node{
        let i:any;
        let data = vnode.data;
        if(data !== undefined){
            const init = data.hook?.init;
            if(isDef(init)){
                init(vnode);
                data = vnode.data;
            }
        }
        const children = vnode.children;
        const sel = vnode.sel;
        if(sel === "!"){
            if(isUndef(vnode.text)){
                vnode.text = "";
            }
            vnode.elm = api.createComment(vnode.text)
        }else if(sel !== undefined){
            const hashIdx = sel.indexOf("#");
            const dotIdx = sel.indexOf(".",hashIdx);
            const hash = hashIdx > 0 ? hashIdx : sel.length;
            const dot = dotIdx > 0 ? dotIdx : sel.length;
            const tag = 
                hashIdx !== -1 || dotIdx !== -1
                ? sel.slice(0,Math.min(hash,dot))
                : sel;
            const elm = ( 
                vnode.elm = isDef(data)&&isDef((i = data.ns)) 
                    ?api.createElementNS(i,tag,data)
                    :api.createElement(tag,data)
            );
            if(hash < dot) elm.setAttribute("id",sel.slice(hash+1,dot));
            if(dotIdx > 0)
                elm.setAttribute("class",sel.slice(dot+1).replace(/\./g," "));
            for(i = 0;i < cbs.create.length;++i) cbs.create[i](emptyNode,vnode);
            if(is.array(children)){
                for(i = 0;i<children.length;++i){
                    const ch = children[i];
                    if(ch != null){
                        api.appendChild(elm,createElm(ch as VNode,insertedVnodeQueue));
                    }
                }
            }else if(is.primitive(vnode.text)){
                api.appendChild(elm,api.createTextNode(vnode.text));
            }

            const hook = vnode.data!.hook;
            if(isDef(hook)){
                hook.create?.(emptyNode,vnode);
                if(hook.insert){
                    insertedVnodeQueue.push(vnode)
                }
            }
        }else if(options?.experimental?.fragments && vnode.children){
            const children = vnode.children;
            vnode.elm = (
                api.createDocumentFragment ?? documentFragmentIsNotSupported
            )();
            for(i = 0;i < cbs.create.length;++i) cbs.create[i](emptyNode,vnode);
            for(i = 0;i < children.length;++i){
                const ch = children[i];
                if(ch != null){
                    api.appendChild(vnode.elm,createElm(ch as VNode,insertedVnodeQueue));
                }
            }
        }else{
            vnode.elm = api.createTextNode(vnode.text)
        }
        return vnode.elm
    }

    // 增加node节点
    function addVnodes(
        parentElm:Node,
        before:Node | null,
        vnodes:VNode[],
        startIdx:number,
        endIdx:number,
        insertedVnodeQueue:VNodeQueue
    ){
        for(;startIdx <= endIdx;++startIdx){
            const ch = vnodes[startIdx];
            if(ch !== null) api.insertBefore(parentElm,createElm(ch,insertedVnodeQueue),before);
        }
    }

    function invokeDestroyHook(vnode:VNode){
        const data = vnode.data;
        if(data !== undefined){
            data?.hook?.destroy?.(vnode);
            for(let i = 0;i < cbs.destroy.length;++i) cbs.destroy[i](vnode);
            if(vnode.children !== undefined){
                for(let j = 0;j < vnode.children.length;++j){
                    const child = vnode.children[j];
                    if(child != null && typeof child !== "string"){
                        invokeDestroyHook(child)
                    }
                }
            }
        }
    }

    function removeVnodes(
        parentElm:Node,
        vnodes:VNode[],
        startIdx:number,
        endIdx:number
    ):void {
        for(;startIdx <= endIdx;++startIdx){
            let listeners:number;
            let rm:() => void;
            const ch = vnodes[startIdx];
            if(ch != null){
                if(isDef(ch.sel)){
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm,listeners);
                    for(let i=0;i<cbs.remove.length;++i) cbs.remove[i](ch,rm);
                    const removeHook = ch?.data?.hook?.remove;
                    if(isDef(removeHook)){
                        removeHook(ch,rm)
                    }else{
                        rm();
                    }
                }else{
                    api.removeChild(parentElm,ch.elm);
                }
            }
        }
    }


    function updateChildren(
        parentElm:Node,
        oldCh:VNode[],
        newCh:VNode[],
        insertedVnodeQueue:VNodeQueue
    ){
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx:KeyToIndexMap | undefined;
        let idxInOld:number;
        let elmToMove:VNode;
        let before:any;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
              oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            } else if (oldEndVnode == null) {
              oldEndVnode = oldCh[--oldEndIdx];
            } else if (newStartVnode == null) {
              newStartVnode = newCh[++newStartIdx];
            } else if (newEndVnode == null) {
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
              patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
              oldStartVnode = oldCh[++oldStartIdx];
              newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
              patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
              oldEndVnode = oldCh[--oldEndIdx];
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
              // Vnode moved right
              patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
              api.insertBefore(
                parentElm,
                oldStartVnode.elm!,
                api.nextSibling(oldEndVnode.elm!)
              );
              oldStartVnode = oldCh[++oldStartIdx];
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
              // Vnode moved left
              patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
              api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
              oldEndVnode = oldCh[--oldEndIdx];
              newStartVnode = newCh[++newStartIdx];
            } else {
              if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
              }
              idxInOld = oldKeyToIdx[newStartVnode.key as string];
              if (isUndef(idxInOld)) {
                // New element
                api.insertBefore(
                  parentElm,
                  createElm(newStartVnode, insertedVnodeQueue),
                  oldStartVnode.elm!
                );
              } else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.sel !== newStartVnode.sel) {
                  api.insertBefore(
                    parentElm,
                    createElm(newStartVnode, insertedVnodeQueue),
                    oldStartVnode.elm!
                  );
                } else {
                  patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                  oldCh[idxInOld] = undefined as any;
                  api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
                }
              }
              newStartVnode = newCh[++newStartIdx];
            }
        }
        if (newStartIdx <= newEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(
                parentElm,
                before,
                newCh,
                newStartIdx,
                newEndIdx,
                insertedVnodeQueue
            );
        }
        if (oldStartIdx <= oldEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }

    function patchVnode(
        oldVnode:VNode,
        vnode:VNode,
        insertedVnodeQueue:VNodeQueue
    ){
        const hook = vnode.data?.hook;
        hook?.prepatch?.(oldVnode, vnode);
        const elm = (vnode.elm = oldVnode.elm)!;
        const oldCh = oldVnode.children as VNode[];
        const ch = vnode.children as VNode[];
        if (oldVnode === vnode) return;
        if (vnode.data !== undefined) {
            for (let i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            vnode.data.hook?.update?.(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {//如果新旧node都有的话，需要进行diff比较处理
                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            } else if (isDef(ch)) {//只有新的node
                if (isDef(oldVnode.text)) api.setTextContent(elm, "");
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (isDef(oldCh)) {//只有旧的node
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            } else if (isDef(oldVnode.text)) {//去掉旧的文本节点
                api.setTextContent(elm, "");
            }
        } else if (oldVnode.text !== vnode.text) {
            if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            api.setTextContent(elm, vnode.text!);
        }
        hook?.postpatch?.(oldVnode, vnode);
    }


    return function patch(
        oldVnode:VNode | Element | DocumentFragment,
        vnode:VNode
    ):VNode{
        let i: number, elm: Node, parent: Node;
        const insertedVnodeQueue: VNodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

        if (isElement(api, oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        } else if (isDocumentFragment(api, oldVnode)) {
            oldVnode = emptyDocumentFragmentAt(oldVnode);
        }

        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        } else {
            elm = oldVnode.elm!;
            parent = api.parentNode(elm) as Node;

            createElm(vnode, insertedVnodeQueue);

            if (parent !== null) {
                api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }

        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
        return vnode;
    }
}