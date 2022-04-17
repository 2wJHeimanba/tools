
import { AttachData } from "./helpers/attachto";
import { Hooks } from "./hooks";
import { Attrs } from "./modules/attributes";
import { Classes } from "./modules/class";
import { Dataset } from "./modules/dataset";
import { On } from "./modules/eventlisteners";
import { Props } from "./modules/props";
import { VNodeStyle } from "./modules/style";

export type Key = string|number|symbol;

export interface VNode{
    sel:string|undefined,
    data:VNodeData|undefined,
    children:Array<VNode|string>|undefined,
    elm:Node|undefined;
    text:string|undefined;
    key:Key|undefined;
}

export interface VNodeData{
    props?:Props,
    attrs?:Attrs,
    class?:Classes,
    style?:VNodeStyle,
    dataset?:Dataset,
    on?:On,
    attachData?:AttachData,
    hook?:Hooks,
    key?:Key,
    ns?:string,
    fn?:()=>VNode,
    args?:any[],
    is?:string,
    [key:string]:any
}

export function vnode(
    sel:string|undefined,
    data:any|undefined,
    children:Array<string>|undefined,
    text:string|undefined,
    elm:Element|DocumentFragment|Text|undefined
):VNode{
    const key = data === undefined ? undefined : data.key
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}