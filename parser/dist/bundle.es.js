var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
var startTagOpen = new RegExp("^<".concat(qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));

function init(el) {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }
    var html = el.outerHTML;
    var root, currentParent, stack = [];
    // 切割字符串
    function shear(len) {
        html = html.substring(len);
    }
    // 创建
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs: attrs,
            parent: parent
        };
    }
    // 开始标签
    function start(tagName, attrs) {
        var element = createASTElement(tagName, attrs);
        if (!root)
            root = element;
        currentParent = element;
        stack.push(element);
    }
    // 结束标签
    function end(item) {
        var element = stack.pop();
        currentParent = stack[stack.length - 1];
        if (currentParent) {
            element.parent = currentParent;
            currentParent.children.push(element);
        }
    }
    // 文本内容
    function chars(text) {
        text = text.trim();
        if (text.length > 0) {
            currentParent.children.push({
                type: 3,
                text: text
            });
        }
    }
    function parseStartTag() {
        var start = html.match(startTagOpen);
        var end, attr;
        if (start) {
            var match = {
                tagName: start[1],
                attrs: []
            };
            shear(start[0].length);
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                });
                shear(attr[0].length);
            }
            if (end) {
                shear(end[0].length);
                return match;
            }
        }
    }
    var text;
    while (html) {
        var textEnd = html.indexOf("<");
        if (textEnd === 0) {
            var startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            var endTagMatch = html.match(endTag);
            if (endTagMatch) {
                shear(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }
        }
        if (textEnd > 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            shear(text.length);
            chars(text);
        }
    }
    return root;
}

var result = init(".container");
console.log(result);
