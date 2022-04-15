import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is"

export type VNodeChildElement = 
    |VNode
    |string
    |number
    |String
    |Number
    |undefined
    |null;
export type ArrayOrElement<T> = T|T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
    sel:string,
    data:VNodeData|null,
    children:VNodeChildren
):VNode;
export function h(sel:any,b?:any,c?:any):VNode{
    let data:VNodeData = {};
    let children:any;
    let text:any;
    let i:number;
    if(c !== undefined){
        if(b !== null){
            data = b;
        }
        if(is.array(c)){
            children = c
        }else if(is.primitive(c)){
            text = c.toString();
        }else if(c && c.sel){
            children = [c];
        }
    }else if(b !== undefined && b !== null){
        if(is.array(b)){
            children = b;
        }else if(is.primitive(b)){
            text = b.toString();
        }else if(b && b.sel){
            children = [b]
        }else{
            data = b;
        }
    }

    if(children !== undefined){
        for(let i=0;i<children.length;++i){
            if(is.primitive(children[i])){
                children[i] = vnode(
                    undefined,
                    undefined,
                    undefined,
                    children[i],
                    undefined
                )
            }
        }
    }

    return vnode(
        sel,
        data,
        children,
        text,
        undefined
    )
}
