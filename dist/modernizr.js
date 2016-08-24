/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-checked-cssgradients-rgba-smil-svg-addtest-setclasses-teststyles-cssclassprefix:modernizr- !*/
!function(e,t,n){function o(e,t){return typeof e===t}function r(){var e,t,n,r,i,s,a;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],t=c[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=o(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=r:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=r),p.push((r?"":"no-")+a.join("-"))}}function i(e){var t=g.className,n=Modernizr._config.classPrefix||"";if(h&&(t=t.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),h?g.className.baseVal=t:g.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)u(e,n)&&s(n,e[n]);else{e=e.toLowerCase();var o=e.split("."),r=Modernizr[o[0]];if(2==o.length&&(r=r[o[1]]),"undefined"!=typeof r)return Modernizr;t="function"==typeof t?t():t,1==o.length?Modernizr[o[0]]=t:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=t),i([(t&&0!=t?"":"no-")+o.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):h?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(){var e=t.body;return e||(e=a(h?"svg":"body"),e.fake=!0),e}function f(e,n,o,r){var i,s,f,c,d="modernizr",u=a("div"),p=l();if(parseInt(o,10))for(;o--;)f=a("div"),f.id=r?r[o]:d+(o+1),u.appendChild(f);return i=a("style"),i.type="text/css",i.id="s"+d,(p.fake?p:u).appendChild(i),p.appendChild(u),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),u.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",c=g.style.overflow,g.style.overflow="hidden",g.appendChild(p)),s=n(u,e),p.fake?(p.parentNode.removeChild(p),g.style.overflow=c,g.offsetHeight):u.parentNode.removeChild(u),!!s}var c=[],d={_version:"3.3.1",_config:{classPrefix:"modernizr-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){c.push({name:e,fn:t,options:n})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u,p=[],g=t.documentElement,h="svg"===g.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;u=o(e,"undefined")||o(e.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),d._l={},d.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},d._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,o;for(e=0;e<n.length;e++)(o=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){d.addTest=s});var m=d.testStyles=f;Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("checked",function(){return m("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(e){var t=a("input");return t.setAttribute("type","checkbox"),t.setAttribute("checked","checked"),e.appendChild(t),20===t.offsetLeft})});var v=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];d._prefixes=v,Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",o="",r=0,i=v.length-1;i>r;r++)e=0===r?"to ":"",o+=t+v[r]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(o+=t+"-webkit-"+n);var s=a("a"),l=s.style;return l.cssText=o,(""+l.backgroundImage).indexOf("gradient")>-1}),Modernizr.addTest("rgba",function(){var e=a("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1});var w={}.toString;Modernizr.addTest("smil",function(){return!!t.createElementNS&&/SVGAnimate/.test(w.call(t.createElementNS("http://www.w3.org/2000/svg","animate")))}),r(),i(p),delete d.addTest,delete d.addAsyncTest;for(var y=0;y<Modernizr._q.length;y++)Modernizr._q[y]();e.Modernizr=Modernizr}(window,document);