(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[186],{5369:function(t,e,n){"use strict";var r=n(5893);n(7294);e.Z=function(t){var e=t.id,n=t.wordsList,a=t.partsList,o=t.hasBrackets,i=void 0!==o&&o,s=t.hasTextCenter,c=void 0!==s&&s,u=t.hasSpeechButton,l=void 0!==u&&u,d=t.onSpeech,f=void 0===d?function(){}:d;return(0,r.jsx)(r.Fragment,{children:n.map((function(t,n){var o="".concat(e,"_zh-").concat(n);return(0,r.jsxs)("div",{className:c?"tw-flex tw-justify-center tw-items-start":"",children:[l&&0===n&&(0,r.jsx)("button",{type:"button","aria-label":"speech",className:"tw-inline-block tw-align-top tw-mr-1 tw-leading-8 before-font-material before:tw-content-['\\e050'] before:tw-w-8 before:tw-h-8 before:tw-block before:tw-leading-8 before:tw-text-center",onClick:f}),(0,r.jsxs)("span",{className:"tw-mr-2.5 tw-font-bold",children:[i&&"(",a[n],".",i&&")"]}),(0,r.jsx)("span",{children:t})]},o)}))})}},4623:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return k}});var r=n(5893),a=n(1385),o=n(7294),i=n(9704),s=n(4586),c=n(3935),u=n(923),l=n(8655),d=n.n(l),f=function(t){var e=t.children,n=t.show,a=t.onClose,i=(0,o.useState)(!1),s=i[0],l=i[1],f=(0,o.useRef)(null);(0,o.useEffect)((function(){l(!0)}),[]),(0,o.useEffect)((function(){!0===n?document.documentElement.classList.add("is-fixed"):document.documentElement.classList.remove("is-fixed")}),[n]);var w=function(t){t.preventDefault(),a()},p=(0,r.jsx)(u.Z,{in:n,timeout:400,classNames:"fade",nodeRef:f,unmountOnExit:!0,appear:!0,children:(0,r.jsx)("div",{ref:f,className:d()["popup-desktop"],"aria-hidden":"true",onClick:w,children:(0,r.jsxs)("div",{className:d().roof,"aria-hidden":"true",onClick:function(t){t.stopPropagation()},children:[(0,r.jsxs)("button",{type:"button","aria-label":"close-popup",className:d()["close-btn"],onClick:w,children:[(0,r.jsx)("span",{}),(0,r.jsx)("span",{})]}),(0,r.jsx)("div",{className:d().content,children:e})]})})});return!0===s?c.createPortal(p,document.getElementById("modal-root-popup")):null},w=n(5369),p=n(3347),m=n(7175),v=n.n(m),h=function(t){var e=t.id,n=t.wordData,a=(0,p.Z)(),o=n.en,i=n.zh,s=n.parts;return(0,r.jsxs)("div",{className:"tw-text-sm",children:[(0,r.jsx)("div",{className:"tw-text-lg tw-text-wine tw-leading-7",children:o}),(0,r.jsxs)("div",{className:"tw-leading-7",children:[(0,r.jsx)("div",{children:(0,r.jsx)("button",{type:"button","aria-label":"speech",className:v()["speech-btn"],onClick:function(){return a(o)}})}),(0,r.jsx)(w.Z,{id:e,wordsList:i,partsList:s,hasBrackets:!0})]})]})},b=function(t){var e=t.wordData,n=(0,o.useState)(!1),a=n[0],i=n[1],c=e.id,u=e.en,l=e.zh,d=e.parts;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"tw-h-full tw-p-3 tw-block tw-rounded-lg tw-cursor-pointer tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.2)]","aria-hidden":"true",onClick:function(){return i(!0)},children:[(0,r.jsx)("div",{className:"tw-text-base tw-text-wine tw-leading-7 tw-break-all",children:u}),(0,r.jsx)("div",{className:"tw-text-xs tw-text-black tw-leading-6",children:(0,r.jsx)(w.Z,{id:c,wordsList:l,partsList:d})})]}),(0,r.jsx)(f,{show:a,onClose:function(){return i(!1)},children:(0,r.jsx)(h,{id:(0,s.Z)(),wordData:e})})]})},g=n(1898),x=n.n(g),y=function(t){var e=t.options,n=t.onChange,a=(0,o.useState)(""),i=a[0],s=a[1];(0,o.useEffect)((function(){var t=e.length>0?e[0].value:"";s(t)}),[e]);return(0,r.jsx)("div",{className:x().select,children:(0,r.jsx)("select",{value:i,onChange:function(t){s(t.target.value),n(t)},children:e.map((function(t){var e=t.value,n=t.name;return(0,r.jsx)("option",{value:e,children:n},e)}))})})},j=n(6670),_=function(){var t=(0,i.v9)((function(t){return t.common})).screenWidth;return(0,o.useCallback)((function(){if(t>1024)window.scrollTo({top:0,left:0,behavior:"smooth"});else{var e=document.getElementById("__layout");null!==e&&e.scrollTo({top:0,left:0,behavior:"smooth"})}}),[t])},S=n(1858),N=n(39),k=function(){var t=S.partsOptionsData,e=N.alphabetOptionsData,n=(0,j.Z)(),s=_(),c=(0,i.v9)((function(t){return t.collection.words})),u=(0,i.v9)((function(t){return t.collection.parts})),l=(0,i.v9)((function(t){return t.common})).scrollValue,d=(0,o.useState)(!1),f=d[0],w=d[1],p=(0,o.useState)([]),m=p[0],v=p[1],h=(0,o.useState)([]),g=h[0],x=h[1],k=(0,o.useState)(0),C=k[0],E=k[1],R=(0,o.useState)(0),L=R[0],O=R[1],A=(0,o.useState)("all"),Z=A[0],D=A[1],V=(0,o.useState)([]),z=V[0],T=V[1],P=(0,o.useState)("all"),I=P[0],M=P[1],B=(0,o.useState)([]),F=B[0],U=B[1],H=(0,o.useState)(!1),J=H[0],W=H[1],X=(0,o.useCallback)((function(){s();var t=(0,a.Z)(c).filter((function(t){var e=t.alphabet,n=t.parts;return"all"===I&&"all"===Z||("all"===I?n.includes(Z):"all"===Z?e===I:e===I&&n.includes(Z))})).sort((function(t,e){var n=t.en.toLocaleLowerCase(),r=e.en.toLocaleLowerCase();return n>r?!1===J?1:-1:n<r?!1===J?-1:1:0})),e=t.length;v(t),E(1),O(Math.floor(e/50)+(e%50>0?1:0))}),[c,Z,I,J]),q=(0,o.useMemo)((function(){return g.map((function(t,e){var n=t.id,a=!(e%2!==1),o=!((e+1)%3!==0);return(0,r.jsx)("li",{className:"tw-w-full tw-mb-3 tablet:tw-w-[calc((100%-0.75rem)/2)] tablet:tw-mr-3 develop:tw-w-[calc((100%-1.5rem)/3)] ".concat(a?"tablet:tw-mr-0 develop:tw-mr-3":""," ").concat(o?"develop:tw-mr-0":""),children:(0,r.jsx)(b,{wordData:t})},n)}))}),[g]);return(0,o.useEffect)((function(){return w(!0),function(){return w(!1)}}),[]),(0,o.useEffect)((function(){if(f){var n=["all"].concat((0,a.Z)(u)).map((function(e){return{name:t.filter((function(t){return t.id===e}))[0].name||e,value:e}})),r=e.map((function(t){var e=t.id;return{name:t.name,value:e}}));D("all"),M("all"),T(n),U(r)}}),[f,u,e,t]),(0,o.useEffect)((function(){f&&X()}),[f,X,c,Z,I,J]),(0,o.useEffect)((function(){var t=window.innerHeight;if(l+t>=document.body.clientHeight-t/2){var e=C+1;e<=L&&E(e)}}),[l]),(0,o.useEffect)((function(){if(C>0){var t=50*(C-1),e=50*C,n=m.slice(t,e),r=[].concat((0,a.Z)(g),(0,a.Z)(n));x(1===C?n:r)}}),[C,m]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h1",{className:"title",children:"\u55ae\u5b57\u5217\u8868"}),(0,r.jsx)("div",{className:"content size-large tw-p-0 tw-rounded-none tw-bg-transparent",children:(0,r.jsxs)("div",{className:"tw-flex tw-items-center tw-flex-wrap tw-justify-end",children:[(0,r.jsx)("div",{className:"tw-w-6/12 tw-pr-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pr-0",children:(0,r.jsx)(y,{options:F,onChange:function(t){M(t.target.value)}})}),(0,r.jsx)("div",{className:"tw-w-6/12 tw-pl-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pl-0",children:(0,r.jsx)(y,{options:z,onChange:function(t){D(t.target.value)}})}),(0,r.jsx)("div",{className:"tw-mr-2.5 tw-leading-none tablet:tw-mb-0",children:(0,r.jsx)("button",{type:"button",className:"tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg tw-flex tw-justify-center tw-items-center before:tw-w-5 before:tw-h-5 before:tw-block before:bg-no-repeat before:tw-bg-center before:tw-bg-contain ".concat(J?"before:tw-bg-[url('../public/img/alphabet_z_to_a.svg')]":"before:tw-bg-[url('../public/img/alphabet_a_to_z.svg')]"),"aria-label":"sort-alpha-button",onClick:function(){return W(!J)}})}),(0,r.jsx)("div",{className:"tw-mr-0 tw-leading-none tablet:tw-mb-0",children:(0,r.jsx)("button",{type:"button",className:"tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg before-font-material before:tw-content-['\\e5d5'] before:tw-text-center before:tw-leading-10 before:tw-text-black","aria-label":"data-update-button",onClick:n})})]})}),(0,r.jsx)("div",{className:"content size-large",children:g.length?(0,r.jsx)("ul",{className:"tw-flex tw-flex-wrap",children:q}):(0,r.jsx)("div",{className:"tw-flex tw-justify-center tw-text-gray tw-py-8",children:"\u76ee\u524d\u6c92\u6709\u8cc7\u6599"})}),l>0&&(0,r.jsx)("button",{type:"button","aria-label":"scroll-to-top-button",className:"tw-w-10 tw-h-10 tw-block tw-fixed tw-right-5 tw-bottom-12 tw-bg-green-dark/60 tw-rounded-full before-font-material before:tw-content-['\\e5d8'] before:tw-leading-10 before:tw-text-yellow",onClick:s})]})}},3347:function(t,e,n){"use strict";var r=n(7294),a=n(5827);e.Z=function(){var t=(0,a.h5)(),e=t.speak,n=t.speaking;return(0,r.useCallback)((function(t){!1===n&&e({text:t})}),[e,n])}},5028:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/collection",function(){return n(4623)}])},7175:function(t){t.exports={"speech-btn":"button_speech-btn__3FkzA","basic-btn":"button_basic-btn__1uj5D","is-disabled":"button_is-disabled__Yh-pI"}},1898:function(t){t.exports={select:"form_select__100yN"}},8655:function(t){t.exports={"popup-desktop":"popup_popup-desktop__1lNEW",roof:"popup_roof__2LVLH","close-btn":"popup_close-btn__215ve",content:"popup_content__i7qMO"}},5827:function(t,e,n){"use strict";var r=n(219);var a=n(4989);function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"h5",{enumerable:!0,get:function(){return o(a).default}})},219:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,a=!1,o=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(c){a=!0,o=c}finally{try{!r&&s.return&&s.return()}finally{if(a)throw o}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},a=n(7294);var o=function(t,e){var n=(0,a.useRef)((function(){throw new Error("Cannot call an event handler while rendering.")}));return(0,a.useEffect)((function(){n.current=t}),[t].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e))),(0,a.useCallback)((function(t){return(0,n.current)(t)}),[n])};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.onEnd,n=void 0===e?function(){}:e,i=t.onResult,s=void 0===i?function(){}:i,c=t.onError,u=void 0===c?function(){}:c,l=(0,a.useRef)(null),d=(0,a.useState)(!1),f=r(d,2),w=f[0],p=f[1],m=(0,a.useState)(!1),v=r(m,2),h=v[0],b=v[1],g=function(t){var e=Array.from(t.results).map((function(t){return t[0]})).map((function(t){return t.transcript})).join("");s(e)},x=function(t){"not-allowed"===t.error&&(l.current.onend=function(){},p(!1)),u(t)},y=o((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!w&&h){var e=t.lang,n=void 0===e?"":e,r=t.interimResults,a=void 0===r||r,o=t.continuous,i=void 0!==o&&o,s=t.maxAlternatives,c=void 0===s?1:s,u=t.grammars;p(!0),l.current.lang=n,l.current.interimResults=a,l.current.onresult=g,l.current.onerror=x,l.current.continuous=i,l.current.maxAlternatives=c,u&&(l.current.grammars=u),l.current.onend=function(){return l.current.start()},l.current.start()}}),[w,h,l]),j=o((function(){w&&h&&(l.current.onresult=function(){},l.current.onend=function(){},l.current.onerror=function(){},p(!1),l.current.stop(),n())}),[w,h,l,n]);return(0,a.useEffect)((function(){"undefined"!==typeof window&&(window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition,window.SpeechRecognition&&(b(!0),l.current=new window.SpeechRecognition))}),[]),{listen:y,listening:w,stop:j,supported:h}}},4989:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,a=!1,o=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(c){a=!0,o=c}finally{try{!r&&s.return&&s.return()}finally{if(a)throw o}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},a=n(7294);e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.onEnd,n=void 0===e?function(){}:e,o=(0,a.useState)([]),i=r(o,2),s=i[0],c=i[1],u=(0,a.useState)(!1),l=r(u,2),d=l[0],f=l[1],w=(0,a.useState)(!1),p=r(w,2),m=p[0],v=p[1],h=function(t){c(t)},b=function(){var t=window.speechSynthesis.getVoices();t.length>0?h(t):window.speechSynthesis.onvoiceschanged=function(e){t=e.target.getVoices(),h(t)}},g=function(){f(!1),n()};(0,a.useEffect)((function(){"undefined"!==typeof window&&window.speechSynthesis&&(v(!0),b())}),[]);var x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.voice,n=void 0===e?null:e,r=t.text,a=void 0===r?"":r,o=t.rate,i=void 0===o?1:o,s=t.pitch,c=void 0===s?1:s,u=t.volume,l=void 0===u?1:u;if(m){f(!0);var d=new window.SpeechSynthesisUtterance;d.text=a,d.voice=n,d.onend=g,d.rate=i,d.pitch=c,d.volume=l,window.speechSynthesis.speak(d)}},y=function(){m&&(f(!1),window.speechSynthesis.cancel())};return{supported:m,speak:x,speaking:d,cancel:y,voices:s}}},4586:function(t,e,n){"use strict";var r;n.d(e,{Z:function(){return d}});var a=new Uint8Array(16);function o(){if(!r&&!(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(a)}var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var s=function(t){return"string"===typeof t&&i.test(t)},c=[],u=0;u<256;++u)c.push((u+256).toString(16).substr(1));var l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(c[t[e+0]]+c[t[e+1]]+c[t[e+2]]+c[t[e+3]]+"-"+c[t[e+4]]+c[t[e+5]]+"-"+c[t[e+6]]+c[t[e+7]]+"-"+c[t[e+8]]+c[t[e+9]]+"-"+c[t[e+10]]+c[t[e+11]]+c[t[e+12]]+c[t[e+13]]+c[t[e+14]]+c[t[e+15]]).toLowerCase();if(!s(n))throw TypeError("Stringified UUID is invalid");return n};var d=function(t,e,n){var r=(t=t||{}).random||(t.rng||o)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,e){n=n||0;for(var a=0;a<16;++a)e[n+a]=r[a];return e}return l(r)}},39:function(t){"use strict";t.exports=JSON.parse('{"alphabetOptionsData":[{"id":"all","name":"\u5168\u90e8\u5b57\u6bcd"},{"id":"a","name":"A"},{"id":"b","name":"B"},{"id":"c","name":"C"},{"id":"d","name":"D"},{"id":"e","name":"E"},{"id":"f","name":"F"},{"id":"g","name":"G"},{"id":"h","name":"H"},{"id":"i","name":"I"},{"id":"j","name":"J"},{"id":"k","name":"K"},{"id":"l","name":"L"},{"id":"m","name":"M"},{"id":"n","name":"N"},{"id":"o","name":"O"},{"id":"p","name":"P"},{"id":"q","name":"Q"},{"id":"r","name":"R"},{"id":"s","name":"S"},{"id":"t","name":"T"},{"id":"u","name":"U"},{"id":"v","name":"V"},{"id":"w","name":"W"},{"id":"x","name":"X"},{"id":"y","name":"Y"},{"id":"z","name":"Z"}]}')},1858:function(t){"use strict";t.exports=JSON.parse('{"partsOptionsData":[{"id":"adj","name":"\u5f62\u5bb9\u8a5e"},{"id":"adv","name":"\u526f\u8a5e"},{"id":"conj","name":"\u9023\u63a5\u8a5e"},{"id":"int","name":"\u611f\u5606\u8a5e"},{"id":"n","name":"\u540d\u8a5e"},{"id":"num","name":"\u6578\u8a5e"},{"id":"phrase","name":"\u7247\u8a9e"},{"id":"prep","name":"\u4ecb\u7cfb\u8a5e"},{"id":"pron","name":"\u4ee3\u540d\u8a5e"},{"id":"v","name":"\u52d5\u8a5e"},{"id":"vi","name":"\u4e0d\u53ca\u7269\u52d5\u8a5e"},{"id":"vt","name":"\u53ca\u7269\u52d5\u8a5e"},{"id":"all","name":"\u5168\u90e8\u985e\u5225"}]}')}},function(t){t.O(0,[774,888,179],(function(){return e=5028,t(t.s=e);var e}));var e=t.O();_N_E=e}]);