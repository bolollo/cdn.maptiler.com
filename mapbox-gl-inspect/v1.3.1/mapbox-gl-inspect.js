!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.MapboxInspect=t()}}(function(){var t;return function t(e,n,o){function r(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var p=n[s]={exports:{}};e[s][0].call(p.exports,function(t){var n=e[s][1][t];return r(n||t)},p,p.exports,t,e,n,o)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(t,e,n){var o=t("./lib/MapboxInspect");e.exports=o},{"./lib/MapboxInspect":3}],2:[function(t,e,n){function o(t,e){var n=document.createElement("div");return n.className="mapboxgl-ctrl mapboxgl-ctrl-group",n.appendChild(t),e||(n.style.display="none"),n}function r(){var t=document.createElement("button");return t.className="mapboxgl-ctrl-icon mapboxgl-ctrl-inspect",t.type="button",t["aria-label"]="Inspect",t}function i(t){t=Object.assign({show:!0,onToggle:function(){}},t),this._btn=r(),this._btn.onclick=t.onToggle,this.elem=o(this._btn,t.show)}i.prototype.setInspectIcon=function(){this._btn.className="mapboxgl-ctrl-icon mapboxgl-ctrl-inspect"},i.prototype.setMapIcon=function(){this._btn.className="mapboxgl-ctrl-icon mapboxgl-ctrl-map"},e.exports=i},{}],3:[function(t,e,n){function o(t){return t.metadata&&t.metadata["mapbox-gl-inspect:inspect"]}function r(t){return Object.assign(t,{metadata:Object.assign({},t.metadata,{"mapbox-gl-inspect:inspect":!0})})}function i(t){return("raster"===t.type||"raster-dem"===t.type)&&t.tileSize&&t.tiles?{type:t.type,tileSize:t.tileSize,tiles:t.tiles}:"raster"!==t.type&&"raster-dem"!==t.type||!t.url?t:{type:t.type,url:t.url}}function s(t){return Object.keys(t.sources).forEach(function(e){t.sources[e]=i(t.sources[e])}),t}function a(t){var e=t.version.split(".").map(parseFloat);e[0]<1&&e[1]<29&&console.error("MapboxInspect only supports Mapbox GL JS >= v0.29.0. Please upgrade your Mapbox GL JS version.")}function u(t){if(!(this instanceof u))throw new Error("MapboxInspect needs to be called with the new keyword");var e=null;window.mapboxgl?(a(window.mapboxgl),e=new window.mapboxgl.Popup({closeButton:!1,closeOnClick:!1})):t.popup||console.error("Mapbox GL JS can not be found. Make sure to include it or pass an initialized MapboxGL Popup to MapboxInspect if you are using moduleis."),this.options=Object.assign({showInspectMap:!1,showInspectButton:!0,showInspectMapPopup:!0,showMapPopup:!1,showMapPopupOnHover:!0,showInspectMapPopupOnHover:!0,blockHoverPopupOnClick:!1,backgroundColor:"#fff",assignLayerColor:h.brightColor,buildInspectStyle:c.generateInspectStyle,renderPopup:f,popup:e,selectThreshold:5,useInspectStyle:!0,queryParameters:{},sources:{}},t),this.sources=this.options.sources,this.assignLayerColor=this.options.assignLayerColor,this.toggleInspector=this.toggleInspector.bind(this),this._popup=this.options.popup,this._popupBlocked=!1,this._showInspectMap=this.options.showInspectMap,this._onSourceChange=this._onSourceChange.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onStyleChange=this._onStyleChange.bind(this),this._originalStyle=null,this._toggle=new p({show:this.options.showInspectButton,onToggle:this.toggleInspector.bind(this)})}var c=t("./stylegen"),p=t("./InspectButton"),l=t("lodash.isequal"),f=t("./renderPopup"),h=t("./colors");u.prototype.toggleInspector=function(){this._showInspectMap=!this._showInspectMap,this.render()},u.prototype._inspectStyle=function(){var t=c.generateColoredLayers(this.sources,this.assignLayerColor);return this.options.buildInspectStyle(this._map.getStyle(),t,{backgroundColor:this.options.backgroundColor})},u.prototype.render=function(){this._showInspectMap?(this.options.useInspectStyle&&this._map.setStyle(s(r(this._inspectStyle()))),this._toggle.setMapIcon()):this._originalStyle&&(this._popup&&this._popup.remove(),this.options.useInspectStyle&&this._map.setStyle(s(this._originalStyle)),this._toggle.setInspectIcon())},u.prototype._onSourceChange=function(){var t=this.sources,e=this._map,n=e.getStyle(),o=Object.keys(n.sources),r=Object.assign({},t);Object.keys(e.style.sourceCaches).forEach(function(n){var o=e.style.sourceCaches[n]||{_source:{}},r=o._source.vectorLayerIds;r?t[n]=r:"geojson"===o._source.type&&(t[n]=[])}),Object.keys(t).forEach(function(e){-1===o.indexOf(e)&&delete t[e]}),!l(r,t)&&Object.keys(t).length>0&&this.render()},u.prototype._onStyleChange=function(){var t=this._map.getStyle();o(t)||(this._originalStyle=t)},u.prototype._onMousemove=function(t){var e;e=0===this.options.selectThreshold?t.point:[[t.point.x-this.options.selectThreshold,t.point.y+this.options.selectThreshold],[t.point.x+this.options.selectThreshold,t.point.y-this.options.selectThreshold]];var n=this._map.queryRenderedFeatures(e,this.options.queryParameters)||[];if(this._map.getCanvas().style.cursor=n.length?"pointer":"",this._showInspectMap){if(!this.options.showInspectMapPopup)return;if("mousemove"===t.type&&!this.options.showInspectMapPopupOnHover)return;"click"===t.type&&this.options.showInspectMapPopupOnHover&&this.options.blockHoverPopupOnClick&&(this._popupBlocked=!this._popupBlocked)}else{if(!this.options.showMapPopup)return;if("mousemove"===t.type&&!this.options.showMapPopupOnHover)return;"click"===t.type&&this.options.showMapPopupOnHover&&this.options.blockHoverPopupOnClick&&(this._popupBlocked=!this._popupBlocked)}if(!this._popupBlocked&&this._popup)if(n.length){this._popup.setLngLat(t.lngLat);var o=typeof this.options.renderPopup(n);"string"===o?this._popup.setHTML(this.options.renderPopup(n)):this._popup.setDOMContent(this.options.renderPopup(n)),this._popup.addTo(this._map)}else this._popup.remove()},u.prototype.onAdd=function(t){return this._map=t,0===Object.keys(this.sources).length&&(t.on("tiledata",this._onSourceChange),t.on("sourcedata",this._onSourceChange)),t.on("styledata",this._onStyleChange),t.on("load",this._onStyleChange),t.on("mousemove",this._onMousemove),t.on("click",this._onMousemove),this._toggle.elem},u.prototype.onRemove=function(){this._map.off("styledata",this._onStyleChange),this._map.off("load",this._onStyleChange),this._map.off("tiledata",this._onSourceChange),this._map.off("sourcedata",this._onSourceChange),this._map.off("mousemove",this._onMousemove),this._map.off("click",this._onMousemove);var t=this._toggle.elem;t.parentNode.removeChild(t),this._map=void 0},e.exports=u},{"./InspectButton":2,"./colors":4,"./renderPopup":5,"./stylegen":6,"lodash.isequal":7}],4:[function(t,e,n){function o(t,e){var n="bright",o=null;return/water|ocean|lake|sea|river/.test(t)&&(o="blue"),/state|country|place/.test(t)&&(o="pink"),/road|highway|transport/.test(t)&&(o="orange"),/contour|building/.test(t)&&(o="monochrome"),/building/.test(t)&&(n="dark"),/contour|landuse/.test(t)&&(o="yellow"),/wood|forest|park|landcover/.test(t)&&(o="green"),"rgba("+r({luminosity:n,hue:o,seed:t,format:"rgbArray"}).concat([e||1]).join(", ")+")"}var r=t("randomcolor");n.brightColor=o},{randomcolor:8}],5:[function(t,e,n){function o(t){return void 0===t||null===t?t:t instanceof Date?t.toLocaleString():"object"==typeof t||"number"==typeof t||"string"==typeof t?t.toString():t}function r(t,e){return'<div class="mapbox-gl-inspect_property"><div class="mapbox-gl-inspect_property-name">'+t+'</div><div class="mapbox-gl-inspect_property-value">'+o(e)+"</div></div>"}function i(t){return'<div class="mapbox-gl-inspect_layer">'+t+"</div>"}function s(t){return[i(t.layer["source-layer"]||t.layer.source),r("$type",t.geometry.type)].concat(Object.keys(t.properties).map(function(e){return r(e,t.properties[e])})).join("")}function a(t){return t.map(function(t){return'<div class="mapbox-gl-inspect_feature">'+s(t)+"</div>"}).join("")}function u(t){return'<div class="mapbox-gl-inspect_popup">'+a(t)+"</div>"}e.exports=u},{}],6:[function(t,e,n){function o(t,e,n){var o={id:[e,n,"circle"].join("_"),source:e,type:"circle",paint:{"circle-color":t,"circle-radius":2},filter:["==","$type","Point"]};return n&&(o["source-layer"]=n),o}function r(t,e,n,o){var r={id:[n,o,"polygon"].join("_"),source:n,type:"fill",paint:{"fill-color":t,"fill-antialias":!0,"fill-outline-color":t},filter:["==","$type","Polygon"]};return o&&(r["source-layer"]=o),r}function i(t,e,n){var o={id:[e,n,"line"].join("_"),source:e,layout:{"line-join":"round","line-cap":"round"},type:"line",paint:{"line-color":t},filter:["==","$type","LineString"]};return n&&(o["source-layer"]=n),o}function s(t,e){function n(t){var n=e.bind(null,t);return{circle:n(.8),line:n(.6),polygon:n(.3),polygonOutline:n(.6),default:n(1)}}var s=[],a=[],u=[];return Object.keys(t).forEach(function(e){var c=t[e];if(c&&0!==c.length)c.forEach(function(t){var c=n(t);a.push(o(c.circle,e,t)),u.push(i(c.line,e,t)),s.push(r(c.polygon,c.polygonOutline,e,t))});else{var p=n(e);a.push(o(p.circle,e)),u.push(i(p.line,e)),s.push(r(p.polygon,p.polygonOutline,e))}}),s.concat(u).concat(a)}function a(t,e,n){n=Object.assign({backgroundColor:"#fff"},n);var o={id:"background",type:"background",paint:{"background-color":n.backgroundColor}},r={};return Object.keys(t.sources).forEach(function(e){var n=t.sources[e];"vector"!==n.type&&"geojson"!==n.type||(r[e]=n)}),Object.assign(t,{layers:[o].concat(e),soources:r})}n.polygonLayer=r,n.lineLayer=i,n.circleLayer=o,n.generateInspectStyle=a,n.generateColoredLayers=s},{}],7:[function(t,e,n){(function(t){function o(t,e){for(var n=-1,o=null==t?0:t.length,r=0,i=[];++n<o;){var s=t[n];e(s,n,t)&&(i[r++]=s)}return i}function r(t,e){for(var n=-1,o=e.length,r=t.length;++n<o;)t[r+n]=e[n];return t}function i(t,e){for(var n=-1,o=null==t?0:t.length;++n<o;)if(e(t[n],n,t))return!0;return!1}function s(t,e){for(var n=-1,o=Array(t);++n<t;)o[n]=e(n);return o}function a(t,e){return t.has(e)}function u(t,e){return null==t?void 0:t[e]}function c(t){var e=-1,n=Array(t.size);return t.forEach(function(t,o){n[++e]=[o,t]}),n}function p(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}function l(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var o=t[e];this.set(o[0],o[1])}}function f(){this.__data__=Me?Me(null):{},this.size=0}function h(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}function d(t){var e=this.__data__;if(Me){var n=e[t];return n===vt?void 0:n}return se.call(e,t)?e[t]:void 0}function y(t){var e=this.__data__;return Me?void 0!==e[t]:se.call(e,t)}function g(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=Me&&void 0===e?vt:e,this}function _(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var o=t[e];this.set(o[0],o[1])}}function v(){this.__data__=[],this.size=0}function b(t){var e=this.__data__,n=N(e,t);return!(n<0)&&(n==e.length-1?e.pop():de.call(e,n,1),--this.size,!0)}function m(t){var e=this.__data__,n=N(e,t);return n<0?void 0:e[n][1]}function j(t){return N(this.__data__,t)>-1}function w(t,e){var n=this.__data__,o=N(n,t);return o<0?(++this.size,n.push([t,e])):n[o][1]=e,this}function k(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var o=t[e];this.set(o[0],o[1])}}function M(){this.size=0,this.__data__={hash:new l,map:new(me||_),string:new l}}function O(t){var e=Y(this,t).delete(t);return this.size-=e?1:0,e}function S(t){return Y(this,t).get(t)}function x(t){return Y(this,t).has(t)}function I(t,e){var n=Y(this,t),o=n.size;return n.set(t,e),this.size+=n.size==o?0:1,this}function C(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new k;++e<n;)this.add(t[e])}function P(t){return this.__data__.set(t,vt),this}function A(t){return this.__data__.has(t)}function z(t){var e=this.__data__=new _(t);this.size=e.size}function L(){this.__data__=new _,this.size=0}function E(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n}function T(t){return this.__data__.get(t)}function B(t){return this.__data__.has(t)}function R(t,e){var n=this.__data__;if(n instanceof _){var o=n.__data__;if(!me||o.length<_t-1)return o.push([t,e]),this.size=++n.size,this;n=this.__data__=new k(o)}return n.set(t,e),this.size=n.size,this}function F(t,e){var n=Te(t),o=!n&&Ee(t),r=!n&&!o&&Be(t),i=!n&&!o&&!r&&Re(t),a=n||o||r||i,u=a?s(t.length,String):[],c=u.length;for(var p in t)!e&&!se.call(t,p)||a&&("length"==p||r&&("offset"==p||"parent"==p)||i&&("buffer"==p||"byteLength"==p||"byteOffset"==p)||et(p,c))||u.push(p);return u}function N(t,e){for(var n=t.length;n--;)if(at(t[n][0],e))return n;return-1}function $(t,e,n){var o=e(t);return Te(t)?o:r(o,n(t))}function H(t){return null==t?void 0===t?Nt:zt:ye&&ye in Object(t)?tt(t):it(t)}function q(t){return ht(t)&&H(t)==wt}function U(t,e,n,o,r){return t===e||(null==t||null==e||!ht(t)&&!ht(e)?t!==t&&e!==e:D(t,e,n,o,U,r))}function D(t,e,n,o,r,i){var s=Te(t),a=Te(e),u=s?kt:Le(t),c=a?kt:Le(e);u=u==wt?Lt:u,c=c==wt?Lt:c;var p=u==Lt,l=c==Lt,f=u==c;if(f&&Be(t)){if(!Be(e))return!1;s=!0,p=!1}if(f&&!p)return i||(i=new z),s||Re(t)?V(t,e,n,o,r,i):X(t,e,u,n,o,r,i);if(!(n&bt)){var h=p&&se.call(t,"__wrapped__"),d=l&&se.call(e,"__wrapped__");if(h||d){var y=h?t.value():t,g=d?e.value():e;return i||(i=new z),r(y,g,n,o,i)}}return!!f&&(i||(i=new z),K(t,e,n,o,r,i))}function G(t){return!(!ft(t)||ot(t))&&(pt(t)?ce:Ut).test(st(t))}function W(t){return ht(t)&&lt(t.length)&&!!Gt[H(t)]}function J(t){if(!rt(t))return ve(t);var e=[];for(var n in Object(t))se.call(t,n)&&"constructor"!=n&&e.push(n);return e}function V(t,e,n,o,r,s){var u=n&bt,c=t.length,p=e.length;if(c!=p&&!(u&&p>c))return!1;var l=s.get(t);if(l&&s.get(e))return l==e;var f=-1,h=!0,d=n&mt?new C:void 0;for(s.set(t,e),s.set(e,t);++f<c;){var y=t[f],g=e[f];if(o)var _=u?o(g,y,f,e,t,s):o(y,g,f,t,e,s);if(void 0!==_){if(_)continue;h=!1;break}if(d){if(!i(e,function(t,e){if(!a(d,e)&&(y===t||r(y,t,n,o,s)))return d.push(e)})){h=!1;break}}else if(y!==g&&!r(y,g,n,o,s)){h=!1;break}}return s.delete(t),s.delete(e),h}function X(t,e,n,o,r,i,s){switch(n){case Ht:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case $t:return!(t.byteLength!=e.byteLength||!i(new fe(t),new fe(e)));case Ot:case St:case At:return at(+t,+e);case xt:return t.name==e.name&&t.message==e.message;case Tt:case Rt:return t==e+"";case Pt:var a=c;case Bt:var u=o&bt;if(a||(a=p),t.size!=e.size&&!u)return!1;var l=s.get(t);if(l)return l==e;o|=mt,s.set(t,e);var f=V(a(t),a(e),o,r,i,s);return s.delete(t),f;case Ft:if(Ae)return Ae.call(t)==Ae.call(e)}return!1}function K(t,e,n,o,r,i){var s=n&bt,a=Q(t),u=a.length;if(u!=Q(e).length&&!s)return!1;for(var c=u;c--;){var p=a[c];if(!(s?p in e:se.call(e,p)))return!1}var l=i.get(t);if(l&&i.get(e))return l==e;var f=!0;i.set(t,e),i.set(e,t);for(var h=s;++c<u;){p=a[c];var d=t[p],y=e[p];if(o)var g=s?o(y,d,p,e,t,i):o(d,y,p,t,e,i);if(!(void 0===g?d===y||r(d,y,n,o,i):g)){f=!1;break}h||(h="constructor"==p)}if(f&&!h){var _=t.constructor,v=e.constructor;_!=v&&"constructor"in t&&"constructor"in e&&!("function"==typeof _&&_ instanceof _&&"function"==typeof v&&v instanceof v)&&(f=!1)}return i.delete(t),i.delete(e),f}function Q(t){return $(t,dt,ze)}function Y(t,e){var n=t.__data__;return nt(e)?n["string"==typeof e?"string":"hash"]:n.map}function Z(t,e){var n=u(t,e);return G(n)?n:void 0}function tt(t){var e=se.call(t,ye),n=t[ye];try{t[ye]=void 0;var o=!0}catch(t){}var r=ue.call(t);return o&&(e?t[ye]=n:delete t[ye]),r}function et(t,e){return!!(e=null==e?jt:e)&&("number"==typeof t||Dt.test(t))&&t>-1&&t%1==0&&t<e}function nt(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}function ot(t){return!!ae&&ae in t}function rt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||oe)}function it(t){return ue.call(t)}function st(t){if(null!=t){try{return ie.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function at(t,e){return t===e||t!==t&&e!==e}function ut(t){return null!=t&&lt(t.length)&&!pt(t)}function ct(t,e){return U(t,e)}function pt(t){if(!ft(t))return!1;var e=H(t);return e==It||e==Ct||e==Mt||e==Et}function lt(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=jt}function ft(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function ht(t){return null!=t&&"object"==typeof t}function dt(t){return ut(t)?F(t):J(t)}function yt(){return[]}function gt(){return!1}var _t=200,vt="__lodash_hash_undefined__",bt=1,mt=2,jt=9007199254740991,wt="[object Arguments]",kt="[object Array]",Mt="[object AsyncFunction]",Ot="[object Boolean]",St="[object Date]",xt="[object Error]",It="[object Function]",Ct="[object GeneratorFunction]",Pt="[object Map]",At="[object Number]",zt="[object Null]",Lt="[object Object]",Et="[object Proxy]",Tt="[object RegExp]",Bt="[object Set]",Rt="[object String]",Ft="[object Symbol]",Nt="[object Undefined]",$t="[object ArrayBuffer]",Ht="[object DataView]",qt=/[\\^$.*+?()[\]{}|]/g,Ut=/^\[object .+?Constructor\]$/,Dt=/^(?:0|[1-9]\d*)$/,Gt={};Gt["[object Float32Array]"]=Gt["[object Float64Array]"]=Gt["[object Int8Array]"]=Gt["[object Int16Array]"]=Gt["[object Int32Array]"]=Gt["[object Uint8Array]"]=Gt["[object Uint8ClampedArray]"]=Gt["[object Uint16Array]"]=Gt["[object Uint32Array]"]=!0,Gt[wt]=Gt[kt]=Gt[$t]=Gt[Ot]=Gt[Ht]=Gt[St]=Gt[xt]=Gt[It]=Gt[Pt]=Gt[At]=Gt[Lt]=Gt[Tt]=Gt[Bt]=Gt[Rt]=Gt["[object WeakMap]"]=!1;var Wt="object"==typeof t&&t&&t.Object===Object&&t,Jt="object"==typeof self&&self&&self.Object===Object&&self,Vt=Wt||Jt||Function("return this")(),Xt="object"==typeof n&&n&&!n.nodeType&&n,Kt=Xt&&"object"==typeof e&&e&&!e.nodeType&&e,Qt=Kt&&Kt.exports===Xt,Yt=Qt&&Wt.process,Zt=function(){try{return Yt&&Yt.binding&&Yt.binding("util")}catch(t){}}(),te=Zt&&Zt.isTypedArray,ee=Array.prototype,ne=Function.prototype,oe=Object.prototype,re=Vt["__core-js_shared__"],ie=ne.toString,se=oe.hasOwnProperty,ae=function(){var t=/[^.]+$/.exec(re&&re.keys&&re.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ue=oe.toString,ce=RegExp("^"+ie.call(se).replace(qt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),pe=Qt?Vt.Buffer:void 0,le=Vt.Symbol,fe=Vt.Uint8Array,he=oe.propertyIsEnumerable,de=ee.splice,ye=le?le.toStringTag:void 0,ge=Object.getOwnPropertySymbols,_e=pe?pe.isBuffer:void 0,ve=function(t,e){return function(n){return t(e(n))}}(Object.keys,Object),be=Z(Vt,"DataView"),me=Z(Vt,"Map"),je=Z(Vt,"Promise"),we=Z(Vt,"Set"),ke=Z(Vt,"WeakMap"),Me=Z(Object,"create"),Oe=st(be),Se=st(me),xe=st(je),Ie=st(we),Ce=st(ke),Pe=le?le.prototype:void 0,Ae=Pe?Pe.valueOf:void 0;l.prototype.clear=f,l.prototype.delete=h,l.prototype.get=d,l.prototype.has=y,l.prototype.set=g,_.prototype.clear=v,_.prototype.delete=b,_.prototype.get=m,_.prototype.has=j,_.prototype.set=w,k.prototype.clear=M,k.prototype.delete=O,k.prototype.get=S,k.prototype.has=x,k.prototype.set=I,C.prototype.add=C.prototype.push=P,C.prototype.has=A,z.prototype.clear=L,z.prototype.delete=E,z.prototype.get=T,z.prototype.has=B,z.prototype.set=R;var ze=ge?function(t){return null==t?[]:(t=Object(t),o(ge(t),function(e){return he.call(t,e)}))}:yt,Le=H;(be&&Le(new be(new ArrayBuffer(1)))!=Ht||me&&Le(new me)!=Pt||je&&"[object Promise]"!=Le(je.resolve())||we&&Le(new we)!=Bt||ke&&"[object WeakMap]"!=Le(new ke))&&(Le=function(t){var e=H(t),n=e==Lt?t.constructor:void 0,o=n?st(n):"";if(o)switch(o){case Oe:return Ht;case Se:return Pt;case xe:return"[object Promise]";case Ie:return Bt;case Ce:return"[object WeakMap]"}return e});var Ee=q(function(){return arguments}())?q:function(t){return ht(t)&&se.call(t,"callee")&&!he.call(t,"callee")},Te=Array.isArray,Be=_e||gt,Re=te?function(t){return function(e){return t(e)}}(te):W;e.exports=ct}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n,o){!function(e,r){if("function"==typeof t&&t.amd)t([],r);else if("object"==typeof o){var i=r();"object"==typeof n&&n&&n.exports&&(o=n.exports=i),o.randomColor=i}else e.randomColor=r()}(this,function(){function t(t){var e=i(t.hue),n=u(e);return n<0&&(n=360+n),n}function e(t,e){if("random"===e.luminosity)return u([0,100]);if("monochrome"===e.hue)return 0;var n=s(t),o=n[0],r=n[1];switch(e.luminosity){case"bright":o=55;break;case"dark":o=r-10;break;case"light":r=55}return u([o,r])}function n(t,e,n){var o=r(t,e),i=100;switch(n.luminosity){case"dark":i=o+20;break;case"light":o=(i+o)/2;break;case"random":o=0,i=100}return u([o,i])}function o(t,e){switch(e.format){case"hsvArray":return t;case"hslArray":return f(t);case"hsl":var n=f(t);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var o=f(t);return"hsla("+o[0]+", "+o[1]+"%, "+o[2]+"%, "+Math.random()+")";case"rgbArray":return l(t);case"rgb":return"rgb("+l(t).join(", ")+")";case"rgba":return"rgba("+l(t).join(", ")+", "+Math.random()+")";default:return c(t)}}function r(t,e){for(var n=a(t).lowerBounds,o=0;o<n.length-1;o++){var r=n[o][0],i=n[o][1],s=n[o+1][0],u=n[o+1][1];if(e>=r&&e<=s){var c=(u-i)/(s-r);return c*e+(i-c*r)}}return 0}function i(t){if("number"==typeof parseInt(t)){var e=parseInt(t);if(e<360&&e>0)return[e,e]}if("string"==typeof t&&y[t]){var n=y[t];if(n.hueRange)return n.hueRange}return[0,360]}function s(t){return a(t).saturationRange}function a(t){t>=334&&t<=360&&(t-=360);for(var e in y){var n=y[e];if(n.hueRange&&t>=n.hueRange[0]&&t<=n.hueRange[1])return y[e]}return"Color not found"}function u(t){if(null===d)return Math.floor(t[0]+Math.random()*(t[1]+1-t[0]));var e=t[1]||1,n=t[0]||0;d=(9301*d+49297)%233280;var o=d/233280;return Math.floor(n+o*(e-n))}function c(t){function e(t){var e=t.toString(16);return 1==e.length?"0"+e:e}var n=l(t);return"#"+e(n[0])+e(n[1])+e(n[2])}function p(t,e,n){var o=n[0][0],r=n[n.length-1][0],i=n[n.length-1][1],s=n[0][1];y[t]={hueRange:e,lowerBounds:n,saturationRange:[o,r],brightnessRange:[i,s]}}function l(t){var e=t[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=t[1]/100,o=t[2]/100,r=Math.floor(6*e),i=6*e-r,s=o*(1-n),a=o*(1-i*n),u=o*(1-(1-i)*n),c=256,p=256,l=256;switch(r){case 0:c=o,p=u,l=s;break;case 1:c=a,p=o,l=s;break;case 2:c=s,p=o,l=u;break;case 3:c=s,p=a,l=o;break;case 4:c=u,p=s,l=o;break;case 5:c=o,p=s,l=a}return[Math.floor(255*c),Math.floor(255*p),Math.floor(255*l)]}function f(t){var e=t[0],n=t[1]/100,o=t[2]/100,r=(2-n)*o;return[e,Math.round(n*o/(r<1?r:2-r)*1e4)/100,r/2*100]}function h(t){for(var e=0,n=0;n!==t.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=t.charCodeAt(n);return e}var d=null,y={};!function(){p("monochrome",null,[[0,0],[100,0]]),p("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),p("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),p("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),p("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),p("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),p("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),p("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}();var g=function(r){if(r=r||{},r.seed&&r.seed===parseInt(r.seed,10))d=r.seed;else if("string"==typeof r.seed)d=h(r.seed);else{if(void 0!==r.seed&&null!==r.seed)throw new TypeError("The seed value must be an integer or string");d=null}var i,s,a;if(null!==r.count&&void 0!==r.count){var u=r.count,c=[];for(r.count=null;u>c.length;)d&&r.seed&&(r.seed+=1),c.push(g(r));return r.count=u,c}return i=t(r),s=e(i,r),a=n(i,s,r),o([i,s,a],r)};return g})},{}]},{},[1])(1)});