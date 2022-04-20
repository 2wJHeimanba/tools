
import {
    startTagOpen,
    startTagClose,
    attribute,
    endTag
} from "./parser/domreg"
import { vnode } from "./vnode";

interface Match{
    tagName:string|undefined,
    attrs:any|undefined
}

export function init(el:string|Element){
    if(typeof el === "string"){
        el = document.querySelector(el)
    }
    let html:string = el.outerHTML;
    let root,
        currentParent,
        stack = [];

    // 切割字符串
    function shear(len:number){
        html = html.substring(len);
    }

    // 创建
    function createASTElement(tagName,attrs){
        return {
            tag:tagName,
            type:1,
            children:[],
            attrs,
            parent,
        }
    }

    // 开始标签
    function start(tagName:string,attrs:Record<string,any>){
        const element = createASTElement(tagName,attrs);
        if(!root) root = element;
        currentParent = element;
        stack.push(element)
    }

    // 结束标签
    function end(item){
        const element = stack.pop();
        currentParent = stack[stack.length - 1];
        if(currentParent){
            element.parent = currentParent;
            currentParent.children.push(element)
        }
    }

    // 文本内容
    function chars(text:string){
        text = text.trim();
        if(text.length > 0){
            currentParent.children.push({
                type:3,
                text
            })
        }
    }

    function parseStartTag():Match{
        const start = html.match(startTagOpen);
        let end,
            attr;
        if(start){
            const match:Match = {
                tagName:start[1],
                attrs:[]
            }
            shear(start[0].length);
            while(!(end=html.match(startTagClose)) && (attr = html.match(attribute))){
                match.attrs.push({
                    name:attr[1],
                    value:attr[3]||attr[4]||attr[5]
                });
                shear(attr[0].length);
            }

            if(end){
                shear(end[0].length);
                return match
            }
        }
    }

    let text;
    while(html){
                    
        let textEnd = html.indexOf("<");
        if(textEnd===0){
            const startTagMatch = parseStartTag();
            if(startTagMatch){
                start(startTagMatch.tagName,startTagMatch.attrs);
                continue;
            }
            const endTagMatch = html.match(endTag);
            if(endTagMatch){
                shear(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }
        }

        if(textEnd > 0){
            text = html.substring(0,textEnd)
        }

        if(text){
            shear(text.length);
            chars(text)
        }
    }
    return root
}