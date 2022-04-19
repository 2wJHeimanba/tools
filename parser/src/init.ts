
import {
    startTagOpen,
    startTagClose,
    attribute,
    endTag
} from "./parser/domreg"

interface Match{
    tagName:string|undefined,
    attrs:any|undefined
}

export function init(el:string|Element){
    if(typeof el === "string"){
        el = document.querySelector(el)
    }
    let html:string = el.outerHTML;

    // 切割字符串
    function shear(len:number){
        html = html.substring(len);
    }

    function start(tagName,attrs){
        console.log("start",tagName,attrs)
    }

    function end(item){
        console.log("end",item)
    }

    function chars(item){
        console.log("chars",item)
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
}