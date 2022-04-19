

export interface VNode{
    sel:string|undefined,
    data:VNodeData|undefined,
    children:Array<VNode|string>|undefined,
    text:string|undefined,
    elm:Node|undefined,
    key:string|number|symbol|undefined
}

export interface VNodeData{
    props?:Record<string,any>,
    attrs?:Record<string,number|string|boolean>;
    class?:Record<string,boolean>,
    key?:string|number|symbol
}

export function vnode(
    sel:string|undefined,
    data:any|undefined,
    children:Array<string>|undefined,
    text:string|undefined,
    elm:Element|DocumentFragment|Text|undefined
):VNode{
    const key = data === undefined ? undefined : data.key;
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}