function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return {
        sel: sel,
        data: data,
        children: children,
        text: text,
        elm: elm,
        key: key
    };
}

var array = Array.isArray;
function primitive(s) {
    return (typeof s === "string" ||
        typeof s === "number" ||
        s instanceof String ||
        s instanceof Number);
}

function h(sel, b, c) {
    var data = {};
    var children;
    var text;
    if (c !== undefined) {
        if (b !== null) {
            data = b;
        }
        if (array(c)) {
            children = c;
        }
        else if (primitive(c)) {
            text = c.toString();
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined && b !== null) {
        if (array(b)) {
            children = b;
        }
        else if (primitive(b)) {
            text = b.toString();
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (children !== undefined) {
        for (var i_1 = 0; i_1 < children.length; ++i_1) {
            if (primitive(children[i_1])) {
                children[i_1] = vnode(undefined, undefined, undefined, children[i_1], undefined);
            }
        }
    }
    return vnode(sel, data, children, text, undefined);
}

var test = h("div", {
    style: { color: "red" }
}, h("span", "wenjianjia"));
console.log(test, "result");
