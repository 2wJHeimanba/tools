import { VNode } from "../vnode";

type Listener<T> = (this:VNode,ev:T,vnode:VNode)=>void;
export type On = {
    [N in keyof HTMLElementEventMap]?:
      |Listener<HTMLElementEventMap[N]>
      |Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event:string]:Listener<any>|Array<Listener<any>>
};