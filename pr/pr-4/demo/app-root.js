(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();function ut(r,t,e,i){var s=arguments.length,n=s<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,t,e,i);else for(var c=r.length-1;c>=0;c--)(o=r[c])&&(n=(s<3?o(n):s>3?o(t,e,n):o(t,e))||n);return s>3&&n&&Object.defineProperty(t,e,n),n}function D(r,t,e,i){function s(n){return n instanceof e?n:new e(function(o){o(n)})}return new(e||(e=Promise))(function(n,o){function c(h){try{a(i.next(h))}catch(d){o(d)}}function l(h){try{a(i.throw(h))}catch(d){o(d)}}function a(h){h.done?n(h.value):s(h.value).then(c,l)}a((i=i.apply(r,t||[])).next())})}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=window,pt=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),vt=new WeakMap;let Mt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(pt&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&vt.set(e,t))}return t}toString(){return this.cssText}};const Gt=r=>new Mt(typeof r=="string"?r:r+"",void 0,$t),Jt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new Mt(e,r,$t)},Qt=(r,t)=>{pt?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=V.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)})},ft=pt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Gt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Q;const K=window,_t=K.trustedTypes,Yt=_t?_t.emptyScript:"",yt=K.reactiveElementPolyfillSupport,lt={toAttribute(r,t){switch(t){case Boolean:r=r?Yt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ot=(r,t)=>t!==r&&(t==t||r==r),Y={attribute:!0,type:String,converter:lt,reflect:!1,hasChanged:Ot},at="finalized";let w=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Y}static finalize(){if(this.hasOwnProperty(at))return!1;this[at]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(ft(s))}else t!==void 0&&e.push(ft(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Qt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Y){var s;const n=this.constructor._$Ep(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:lt).toAttribute(e,i.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(n!==void 0&&this._$El!==n){const o=s.getPropertyOptions(n),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?o.converter:lt;this._$El=n,this[n]=c.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Ot)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,n)=>this[n]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};w[at]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},yt==null||yt({ReactiveElement:w}),((Q=K.reactiveElementVersions)!==null&&Q!==void 0?Q:K.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var X;const W=window,C=W.trustedTypes,At=C?C.createPolicy("lit-html",{createHTML:r=>r}):void 0,ht="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,Ut="?"+y,Xt=`<${Ut}>`,x=document,q=()=>x.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",Bt=Array.isArray,te=r=>Bt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",tt=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,gt=/>/g,m=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,Et=/"/g,It=/^(?:script|style|textarea|title)$/i,O=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),xt=new WeakMap,b=x.createTreeWalker(x,129,null,!1);function zt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(t):t}const ee=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":"",o=k;for(let c=0;c<e;c++){const l=r[c];let a,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===k?h[1]==="!--"?o=mt:h[1]!==void 0?o=gt:h[2]!==void 0?(It.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=m):h[3]!==void 0&&(o=m):o===m?h[0]===">"?(o=s??k,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,a=h[1],o=h[3]===void 0?m:h[3]==='"'?Et:bt):o===Et||o===bt?o=m:o===mt||o===gt?o=k:(o=m,s=void 0);const p=o===m&&r[c+1].startsWith("/>")?" ":"";n+=o===k?l+Xt:d>=0?(i.push(a),l.slice(0,d)+ht+l.slice(d)+y+p):l+y+(d===-2?(i.push(void 0),c):p)}return[zt(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};let ct=class jt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const c=t.length-1,l=this.parts,[a,h]=ee(t,e);if(this.el=jt.createElement(a,i),b.currentNode=this.el.content,e===2){const d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(s=b.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const u of s.getAttributeNames())if(u.endsWith(ht)||u.startsWith(y)){const p=h[o++];if(d.push(u),p!==void 0){const J=s.getAttribute(p.toLowerCase()+ht).split(y),_=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:_[2],strings:J,ctor:_[1]==="."?se:_[1]==="?"?ne:_[1]==="@"?oe:F})}else l.push({type:6,index:n})}for(const u of d)s.removeAttribute(u)}if(It.test(s.tagName)){const d=s.textContent.split(y),u=d.length-1;if(u>0){s.textContent=C?C.emptyScript:"";for(let p=0;p<u;p++)s.append(d[p],q()),b.nextNode(),l.push({type:2,index:++n});s.append(d[u],q())}}}else if(s.nodeType===8)if(s.data===Ut)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(y,d+1))!==-1;)l.push({type:7,index:n}),d+=y.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}};function N(r,t,e=r,i){var s,n,o,c;if(t===O)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const a=M(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(r),l._$AT(r,e,i)),i!==void 0?((o=(c=e)._$Co)!==null&&o!==void 0?o:c._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=N(r,l._$AS(r,t.values),l,i)),t}let ie=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:x).importNode(i,!0);b.currentNode=n;let o=b.nextNode(),c=0,l=0,a=s[0];for(;a!==void 0;){if(c===a.index){let h;a.type===2?h=new Dt(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new le(o,this,t)),this._$AV.push(h),a=s[++l]}c!==(a==null?void 0:a.index)&&(o=b.nextNode(),c++)}return b.currentNode=x,n}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Dt=class Vt{constructor(t,e,i,s){var n;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(n=s==null?void 0:s.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=N(this,t,e),M(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):te(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==$&&M(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ct.createElement(zt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(i);else{const o=new ie(n,this),c=o.u(this.options);o.v(i),this.$(c),this._$AH=o}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new ct(t)),e}T(t){Bt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Vt(this.k(q()),this.k(q()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},F=class{constructor(t,e,i,s,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(n===void 0)t=N(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==O,o&&(this._$AH=t);else{const c=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=N(this,c[i+l],e,l),a===O&&(a=this._$AH[l]),o||(o=!M(a)||a!==this._$AH[l]),a===$?t=$:t!==$&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}o&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},se=class extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}};const re=C?C.emptyScript:"";let ne=class extends F{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$?this.element.setAttribute(this.name,re):this.element.removeAttribute(this.name)}},oe=class extends F{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=(i=N(this,t,e,0))!==null&&i!==void 0?i:$)===O)return;const s=this._$AH,n=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==$&&(s===$||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},le=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}};const St=W.litHtmlPolyfillSupport;St==null||St(ct,Dt),((X=W.litHtmlVersions)!==null&&X!==void 0?X:W.litHtmlVersions=[]).push("2.8.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var et;const Z=window,H=Z.trustedTypes,wt=H?H.createPolicy("lit-html",{createHTML:r=>r}):void 0,dt="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,Kt="?"+A,ae=`<${Kt}>`,S=document,U=()=>S.createComment(""),B=r=>r===null||typeof r!="object"&&typeof r!="function",Wt=Array.isArray,he=r=>Wt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",it=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ct=/-->/g,Nt=/>/g,g=RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ht=/'/g,Rt=/"/g,qt=/^(?:script|style|textarea|title)$/i,ce=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),st=ce(1),R=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Lt=new WeakMap,E=S.createTreeWalker(S,129,null,!1);function Zt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return wt!==void 0?wt.createHTML(t):t}const de=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":"",o=P;for(let c=0;c<e;c++){const l=r[c];let a,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===P?h[1]==="!--"?o=Ct:h[1]!==void 0?o=Nt:h[2]!==void 0?(qt.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=g):h[3]!==void 0&&(o=g):o===g?h[0]===">"?(o=s??P,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,a=h[1],o=h[3]===void 0?g:h[3]==='"'?Rt:Ht):o===Rt||o===Ht?o=g:o===Ct||o===Nt?o=P:(o=g,s=void 0);const p=o===g&&r[c+1].startsWith("/>")?" ":"";n+=o===P?l+ae:d>=0?(i.push(a),l.slice(0,d)+dt+l.slice(d)+A+p):l+A+(d===-2?(i.push(void 0),c):p)}return[Zt(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class I{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const c=t.length-1,l=this.parts,[a,h]=de(t,e);if(this.el=I.createElement(a,i),E.currentNode=this.el.content,e===2){const d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(s=E.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const u of s.getAttributeNames())if(u.endsWith(dt)||u.startsWith(A)){const p=h[o++];if(d.push(u),p!==void 0){const J=s.getAttribute(p.toLowerCase()+dt).split(A),_=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:_[2],strings:J,ctor:_[1]==="."?pe:_[1]==="?"?ve:_[1]==="@"?fe:G})}else l.push({type:6,index:n})}for(const u of d)s.removeAttribute(u)}if(qt.test(s.tagName)){const d=s.textContent.split(A),u=d.length-1;if(u>0){s.textContent=H?H.emptyScript:"";for(let p=0;p<u;p++)s.append(d[p],U()),E.nextNode(),l.push({type:2,index:++n});s.append(d[u],U())}}}else if(s.nodeType===8)if(s.data===Kt)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(A,d+1))!==-1;)l.push({type:7,index:n}),d+=A.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function L(r,t,e=r,i){var s,n,o,c;if(t===R)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const a=B(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(r),l._$AT(r,e,i)),i!==void 0?((o=(c=e)._$Co)!==null&&o!==void 0?o:c._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=L(r,l._$AS(r,t.values),l,i)),t}class ue{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:S).importNode(i,!0);E.currentNode=n;let o=E.nextNode(),c=0,l=0,a=s[0];for(;a!==void 0;){if(c===a.index){let h;a.type===2?h=new j(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new _e(o,this,t)),this._$AV.push(h),a=s[++l]}c!==(a==null?void 0:a.index)&&(o=E.nextNode(),c++)}return E.currentNode=S,n}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class j{constructor(t,e,i,s){var n;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(n=s==null?void 0:s.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),B(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):he(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&B(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=I.createElement(Zt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(i);else{const o=new ue(n,this),c=o.u(this.options);o.v(i),this.$(c),this._$AH=o}}_$AC(t){let e=Lt.get(t.strings);return e===void 0&&Lt.set(t.strings,e=new I(t)),e}T(t){Wt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new j(this.k(U()),this.k(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class G{constructor(t,e,i,s,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(n===void 0)t=L(this,t,e,0),o=!B(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{const c=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=L(this,c[i+l],e,l),a===R&&(a=this._$AH[l]),o||(o=!B(a)||a!==this._$AH[l]),a===v?t=v:t!==v&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}o&&!s&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class pe extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const $e=H?H.emptyScript:"";class ve extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,$e):this.element.removeAttribute(this.name)}}class fe extends G{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=(i=L(this,t,e,0))!==null&&i!==void 0?i:v)===R)return;const s=this._$AH,n=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==v&&(s===v||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class _e{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const kt=Z.litHtmlPolyfillSupport;kt==null||kt(I,j),((et=Z.litHtmlVersions)!==null&&et!==void 0?et:Z.litHtmlVersions=[]).push("2.8.0");const ye=(r,t,e)=>{var i,s;const n=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let o=n._$litPart$;if(o===void 0){const c=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=o=new j(t.insertBefore(U(),c),c,void 0,e??{})}return o._$AI(r),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var rt,nt;class T extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return R}}T.finalized=!0,T._$litElement$=!0,(rt=globalThis.litElementHydrateSupport)===null||rt===void 0||rt.call(globalThis,{LitElement:T});const Pt=globalThis.litElementPolyfillSupport;Pt==null||Pt({LitElement:T});((nt=globalThis.litElementVersions)!==null&&nt!==void 0?nt:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ae=r=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(r,t):((e,i)=>{const{kind:s,elements:n}=i;return{kind:s,elements:n,finisher(o){customElements.define(e,o)}}})(r,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}},ge=(r,t,e)=>{t.constructor.createProperty(e,r)};function be(r){return(t,e)=>e!==void 0?ge(r,t,e):me(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ft(r){return be({...r,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;((ot=window.HTMLSlotElement)===null||ot===void 0?void 0:ot.prototype.assignedElements)!=null;let Ee=()=>({events:{},emit(r,...t){(this.events[r]||[]).forEach(e=>e(...t))},on(r,t){return(this.events[r]=this.events[r]||[]).push(t),()=>this.events[r]=(this.events[r]||[]).filter(e=>e!==t)}});function xe(r){return new Promise(t=>setTimeout(t,r))}var f;(function(r){r.retryNumber="retryNumber",r.owner="owner",r.dynamicImportLoaded="dynamicImportLoaded",r.hasBeenRetried="hasBeenRetried"})(f||(f={}));const Tt="lazyLoaderService";class Se{constructor(t){var e,i,s;this.emitter=Ee(),this.container=(e=t==null?void 0:t.container)!==null&&e!==void 0?e:document.head,this.retryCount=(i=t==null?void 0:t.retryCount)!==null&&i!==void 0?i:2,this.retryInterval=(s=t==null?void 0:t.retryInterval)!==null&&s!==void 0?s:1}on(t,e){return this.emitter.on(t,e)}loadBundle(t){return D(this,void 0,void 0,function*(){let e,i;return t.module&&(e=this.loadScript({src:t.module,bundleType:"module"})),t.nomodule&&(i=this.loadScript({src:t.nomodule,bundleType:"nomodule"})),Promise.race([e,i])})}loadScript(t){return D(this,void 0,void 0,function*(){return this.doLoad(t)})}doLoad(t){var e;return D(this,void 0,void 0,function*(){const i=(e=t.retryNumber)!==null&&e!==void 0?e:0,s=`script[src='${t.src}'][async][${f.owner}='${Tt}'][${f.retryNumber}='${i}']`;let n=this.container.querySelector(s);return n||(n=this.getScriptTag(Object.assign(Object.assign({},t),{retryNumber:i})),this.container.appendChild(n)),new Promise((o,c)=>{if(n.getAttribute(f.dynamicImportLoaded)){o();return}const l=t.scriptBeingRetried,a=n.onload||(l==null?void 0:l.onload);n.onload=d=>{a==null||a(d),n.setAttribute(f.dynamicImportLoaded,"true"),o()};const h=n.onerror||(l==null?void 0:l.onerror);n.onerror=d=>D(this,void 0,void 0,function*(){const u=n.getAttribute(f.hasBeenRetried);if(i<this.retryCount&&!u){n.setAttribute(f.hasBeenRetried,"true"),yield xe(this.retryInterval*1e3);const p=i+1;this.emitter.emit("scriptLoadRetried",t.src,p),this.doLoad(Object.assign(Object.assign({},t),{retryNumber:p,scriptBeingRetried:n}))}else u||this.emitter.emit("scriptLoadFailed",t.src,d),h==null||h(d),c(d)})})})}getScriptTag(t){var e;const i=t.src.replace("'",'"'),s=document.createElement("script"),n=t.retryNumber;s.setAttribute(f.owner,Tt),s.setAttribute("src",i),s.setAttribute(f.retryNumber,n.toString()),s.async=!0;const o=(e=t.attributes)!==null&&e!==void 0?e:{};switch(Object.keys(o).forEach(c=>{s.setAttribute(c,o[c])}),t.bundleType){case"module":s.setAttribute("type",t.bundleType);break;case"nomodule":s.setAttribute(t.bundleType,"");break}return s}}class we{constructor(t,e){this.widgetId=null,this.isExecuting=!1,this.siteKey=t.siteKey,this.grecaptchaLibrary=t.grecaptchaLibrary;const i=this.createContainer();this.setup(i,e)}async execute(){const{widgetId:t}=this;if(t===null)throw new Error("Recaptcha is not setup");return this.isExecuting&&this.finishExecution(),this.isExecuting=!0,new Promise((e,i)=>{this.executionSuccessBlock=s=>{this.finishExecution(),e(s)},this.executionExpiredBlock=()=>{this.finishExecution(),i(new Error("expired"))},this.executionErrorBlock=()=>{this.finishExecution(),i(new Error("error"))},this.grecaptchaLibrary.execute(t)})}finishExecution(){this.isExecuting=!1;const{widgetId:t}=this;t!==null&&this.grecaptchaLibrary.reset(t)}setup(t,e){var i;this.widgetId=this.grecaptchaLibrary.render(t,{callback:this.responseHandler.bind(this),"expired-callback":this.expiredHandler.bind(this),"error-callback":this.errorHandler.bind(this),sitekey:this.siteKey,tabindex:e==null?void 0:e.tabindex,theme:e==null?void 0:e.theme,type:e==null?void 0:e.type,size:(i=e==null?void 0:e.size)!==null&&i!==void 0?i:"invisible",badge:e==null?void 0:e.badge})}createContainer(t){const e=`recaptchaManager-${this.siteKey}`;let i=document.getElementById(e);return i||(i=document.createElement("div"),i.id=e,i.style.position="fixed",i.style.top="50%",i.style.left="50%",i.style.zIndex=t?`${t}`:"10",document.body.appendChild(i)),i}responseHandler(t){this.executionSuccessBlock&&(this.executionSuccessBlock(t),this.executionSuccessBlock=void 0)}expiredHandler(){this.executionExpiredBlock&&(this.executionExpiredBlock(),this.executionExpiredBlock=void 0)}errorHandler(){this.executionErrorBlock&&(this.executionErrorBlock(),this.executionErrorBlock=void 0)}}class Ce{constructor(t){var e;this.recaptchaCache={},this.defaultSiteKey=t==null?void 0:t.defaultSiteKey,this.lazyLoader=(e=t==null?void 0:t.lazyLoader)!==null&&e!==void 0?e:new Se,this.grecaptchaLibraryCache=t==null?void 0:t.grecaptchaLibrary}async getRecaptchaWidget(t){var e;const i=(e=t==null?void 0:t.siteKey)!==null&&e!==void 0?e:this.defaultSiteKey;if(!i)throw new Error("The reCaptcha widget requires a site key");const s=this.recaptchaCache[i];if(s)return s;const n=await this.getRecaptchaLibrary(),o=new we({siteKey:i,grecaptchaLibrary:n},t==null?void 0:t.recaptchaParams);return this.recaptchaCache[i]=o,o}async getRecaptchaLibrary(){return this.grecaptchaLibraryCache?this.grecaptchaLibraryCache:new Promise(t=>{window.grecaptchaLoadedCallback=()=>{setTimeout(()=>{delete window.grecaptchaLoadedCallback},10),this.grecaptchaLibraryCache=window.grecaptcha,t(window.grecaptcha)},this.lazyLoader.loadScript({src:"https://www.google.com/recaptcha/api.js?onload=grecaptchaLoadedCallback&render=explicit"})})}}let z=class extends T{constructor(){super(...arguments),this.recaptchaManager=new Ce({defaultSiteKey:"6Ld64a8UAAAAAGbDwi1927ztGNw7YABQ-dqzvTN2"})}render(){return st`
      <p>
        <button @click="${this.loadRecaptcha}">Load Recaptcha</button
        ><button @click="${this.executeRecaptcha}">Execute Recaptcha</button>
      </p>
      ${this.result?st`<p><strong>Token:</strong></p>
            <p>${this.result}</p>`:""}
      <p>
        <button @click="${this.loadRecaptcha2}">Load Another Recaptcha</button
        ><button @click="${this.executeRecaptcha2}">
          Execute Another Recaptcha
        </button>
      </p>
      ${this.result2?st`<p><strong>Token 2:</strong></p>
            <p>${this.result2}</p>`:""}
    `}async loadRecaptcha(){var t;this.recaptcha1=await((t=this.recaptchaManager)===null||t===void 0?void 0:t.getRecaptchaWidget({recaptchaParams:{tabindex:0,theme:"light",type:"image"}}))}async executeRecaptcha(){if(this.recaptcha1||await this.loadRecaptcha(),!this.recaptcha1){console.error("error loading recaptcha");return}this.result=await this.recaptcha1.execute()}async loadRecaptcha2(){var t;this.recaptcha2=await((t=this.recaptchaManager)===null||t===void 0?void 0:t.getRecaptchaWidget({siteKey:"<your-site-key>"}))}async executeRecaptcha2(){if(this.recaptcha2||await this.loadRecaptcha(),!this.recaptcha2){console.error("error loading recaptcha");return}this.result2=await this.recaptcha2.execute()}};z.styles=Jt`
    :host {
      display: block;
    }
  `;ut([Ft()],z.prototype,"result",void 0);ut([Ft()],z.prototype,"result2",void 0);z=ut([Ae("app-root")],z);
