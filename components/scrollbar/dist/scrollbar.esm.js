function t(t,e){return function(n){var o=this,i=n;clearTimeout(t.id),t.id=setTimeout((function(){t.call(o,i)}),e)}}var e=function(){var t=document.createElement("div");t.className="vans-scrollbar_wrap",t.style.cssText="\n        visibility:hidden;\n        width:100px;\n        position:absolute;\n        top:-99999px;\n    ",document.body.appendChild(t);var e=t.offsetWidth;t.style.overflow="scroll";var n=document.createElement("div");n.style.width="100%",t.appendChild(n);var o=n.offsetWidth;return t.parentNode.removeChild(t),e-o}();window.scroll=function(n,o){var i,r,a;void 0===o&&(o="vans-scroll-box"),n="string"==typeof n?document.querySelector(n):n;var l,c,s,d=!0,p=n.clientHeight,u=n.scrollHeight;function v(t){var e=parseFloat(window.getComputedStyle(i).top)+t.movementY;l+e<=n.clientHeight&&e>=0&&(i.style.top=e+"px",r.scrollTop=u*e/p)}p<u&&(!function(t,n){var o=document.createElement("style");t.style.position="relative",t.style.overflow="hidden",o.innerHTML="\n        .".concat(n,"{\n            margin-right:-").concat(e,"px;\n            overflow:hidden auto;\n            max-height:").concat(t.clientHeight,"px;\n            height:").concat(t.clientHeight,"px;\n        }\n        .vans-scroll-track{\n            width: 12px;\n            position: absolute;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            z-index: 100;\n            background-color: transparent;\n            overflow:hidden;\n        }\n        .vans-scroll-thumb{\n            display:inline-block;\n            width: 12px;\n            border-radius: 6px;\n            background: rgba(204,204,204,0.6);\n            border: 4px solid transparent;\n            background-clip: content-box;\n            position: absolute;\n            top: 0;\n            right: 0;\n            opacity: 0;\n            user-select: none;\n            transition: background-color 0.2s linear;\n        }\n        .vans-scroll-thumb:hover{\n            background-color: rgba(128, 128, 128,0.6);\n        }\n    "),document.head.appendChild(o)}(n,o),(r=document.createElement("div")).setAttribute("class",o),Array.prototype.slice.call(n.children).forEach((function(t){return r.appendChild(t)})),n.appendChild(r),(a=document.createElement("div")).setAttribute("class","vans-scroll-track"),(i=document.createElement("div")).setAttribute("class","vans-scroll-thumb"),a.appendChild(i),n.appendChild(a),l=p*p/u,i.style.height=l+"px",r.addEventListener("scroll",(function(t){var e=r.scrollTop*p/u;l+e<=n.clientHeight&&(i.style.top=e+"px")})),c=t((function(){var t=0,e=setInterval((function(){(t+=.015)>=1&&(clearInterval(e),t=1),i.style.setProperty("opacity","".concat(t.toFixed(2)))}),4)}),300),s=t((function(){var t=1,e=setInterval((function(){(t-=.015)<=0&&(clearInterval(e),t=0),i.style.setProperty("opacity","".concat(t.toFixed(2)))}),4)}),300),n.addEventListener("mouseenter",(function(){d&&c()})),n.addEventListener("mouseleave",(function(){d&&s()})),window.addEventListener("mousedown",(function(t){t.target===i&&(d=!1,window.addEventListener("mousemove",v))})),window.addEventListener("mouseup",(function(t){d=!0,n.contains(t.target)||1!==parseFloat(window.getComputedStyle(i).opacity)||s(),window.removeEventListener("mousemove",v)})))};
