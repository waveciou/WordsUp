(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{7484:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",o="hour",a="day",u="week",c="month",f="quarter",l="year",d="date",h="Invalid Date",w=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,o=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:l,w:u,d:a,D:d,h:o,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},p="en",y={};y[p]=$;var S=function(t){return t instanceof D},b=function t(e,n,r){var i;if(!e)return p;if("string"==typeof e){var s=e.toLowerCase();y[s]&&(i=s),n&&(y[s]=n,i=s);var o=e.split("-");if(!i&&o.length>1)return t(o[0])}else{var a=e.name;y[a]=e,i=a}return!r&&i&&(p=i),i||!r&&p},x=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},M=g;M.l=b,M.i=S,M.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function $(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=$.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(w);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(t,e){var n=x(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return x(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<x(t)},m.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!M.u(e)||e,f=M.p(t),h=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},w=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,$=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case l:return r?h(1,0):h(31,11);case c:return r?h(1,$):h(0,$+1);case u:var p=this.$locale().weekStart||0,y=(v<p?v+7:v)-p;return h(r?m-y:m+(6-y),$);case a:case d:return w(g+"Hours",0);case o:return w(g+"Minutes",1);case s:return w(g+"Seconds",2);case i:return w(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,u=M.p(t),f="set"+(this.$u?"UTC":""),h=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[l]=f+"FullYear",n[o]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[u],w=u===a?this.$D+(e-this.$W):e;if(u===c||u===l){var v=this.clone().set(d,1);v.$d[h](w),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](w);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[M.p(t)]()},m.add=function(r,f){var d,h=this;r=Number(r);var w=M.p(f),v=function(t){var e=x(h);return M.w(e.date(e.date()+Math.round(t*r)),h)};if(w===c)return this.set(c,this.$M+r);if(w===l)return this.set(l,this.$y+r);if(w===a)return v(1);if(w===u)return v(7);var $=(d={},d[s]=e,d[o]=n,d[i]=t,d)[w]||1,m=this.$d.getTime()+r*$;return M.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),s=this.$H,o=this.$m,a=this.$M,u=n.weekdays,c=n.months,f=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},l=function(t){return M.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},w={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:f(n.monthsShort,a,c,3),MMMM:f(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:f(n.weekdaysMin,this.$W,u,2),ddd:f(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(s),HH:M.s(s,2,"0"),h:l(1),hh:l(2),a:d(s,o,!0),A:d(s,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return r.replace(v,(function(t,e){return e||w[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,h){var w,v=M.p(d),$=x(r),m=($.utcOffset()-this.utcOffset())*e,g=this-$,p=M.m(this,$);return p=(w={},w[l]=p/12,w[c]=p,w[f]=p/3,w[u]=(g-m)/6048e5,w[a]=(g-m)/864e5,w[o]=g/n,w[s]=g/e,w[i]=g/t,w)[v]||g,h?p:M.a(p)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=b(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},$}(),O=D.prototype;return x.prototype=O,[["$ms",r],["$s",i],["$m",s],["$H",o],["$W",a],["$M",c],["$y",l],["$D",d]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),x.extend=function(t,e){return t.$i||(t(e,D,x),t.$i=!0),x},x.locale=b,x.isDayjs=S,x.unix=function(t){return x(1e3*t)},x.en=y[p],x.Ls=y,x.p={},x}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(r,i,s){var o=i.prototype;s.utc=function(t){return new i({date:t,utc:!0,args:arguments})},o.utc=function(e){var n=s(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},o.local=function(){return s(this.toDate(),{locale:this.$L,utc:!1})};var a=o.parse;o.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),a.call(this,t)};var u=o.init;o.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var c=o.utcOffset;o.utcOffset=function(r,i){var s=this.$utils().u;if(s(r))return this.$u?0:s(this.$offset)?c.call(this):this.$offset;if("string"==typeof r&&null===(r=function(t){void 0===t&&(t="");var r=t.match(e);if(!r)return null;var i=(""+r[0]).match(n)||["-",0,0],s=i[0],o=60*+i[1]+ +i[2];return 0===o?0:"+"===s?o:-o}(r)))return this;var o=Math.abs(r)<=16?60*r:r,a=this;if(i)return a.$offset=o,a.$u=0===r,a;if(0!==r){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(a=this.local().add(o+u,t)).$offset=o,a.$x.$localOffset=u}else a=this.utc();return a};var f=o.format;o.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return f.call(this,e)},o.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||(new Date).getTimezoneOffset());return this.$d.valueOf()-6e4*t},o.isUTC=function(){return!!this.$u},o.toISOString=function(){return this.toDate().toISOString()},o.toString=function(){return this.toDate().toUTCString()};var l=o.toDate;o.toDate=function(t){return"s"===t&&this.$offset?s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var d=o.diff;o.diff=function(t,e,n){if(t&&this.$u===t.$u)return d.call(this,t,e,n);var r=this.local(),i=s(t).local();return d.call(r,i,e,n)}}}()},5369:function(t,e,n){"use strict";var r=n(5893);n(7294);e.Z=function(t){var e=t.id,n=t.wordsList,i=t.partsList,s=t.hasBrackets,o=void 0!==s&&s,a=t.hasTextCenter,u=void 0!==a&&a,c=t.hasSpeechButton,f=void 0!==c&&c,l=t.onSpeech,d=void 0===l?function(){}:l;return(0,r.jsx)(r.Fragment,{children:n.map((function(t,n){var s="".concat(e,"_zh-").concat(n);return(0,r.jsxs)("div",{className:u?"tw-flex tw-justify-center tw-items-start":"",children:[f&&0===n&&(0,r.jsx)("button",{type:"button","aria-label":"speech",className:"tw-inline-block tw-align-top tw-mr-1 tw-leading-8 before-font-material before:tw-content-['\\e050'] before:tw-w-8 before:tw-h-8 before:tw-block before:tw-leading-8 before:tw-text-center",onClick:d}),(0,r.jsxs)("span",{className:"tw-mr-2.5 tw-font-bold",children:[o&&"(",i[n],".",o&&")"]}),(0,r.jsx)("span",{children:t})]},s)}))})}},8593:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return g}});var r=n(5893),i=n(7484),s=n.n(i),o=n(178),a=n.n(o),u=n(7294),c=n(9704),f=n(5369),l=n(3347),d=function(t){var e=t.dateCaption,n=t.wordData,i=t.onFresh,s=void 0===i?function(){}:i,o=(0,l.Z)(),a=n.id,u=n.en,c=n.zh,d=n.parts;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-mb-4",children:[(0,r.jsx)("h1",{className:"tw-flex tw-items-center tw-leading-8 tw-text-md tw-text-green-dark before-font-material before:tw-content-['\\e8ce'] before:tw-w-8 before:tw-h-8 before:tw-leading-8 before:tw-block before:tw-text-center",children:"\u4eca\u65e5\u55ae\u5b57"}),(0,r.jsxs)("div",{className:"tw-w-full tw-flex tw-items-center tw-justify-end mini:tw-w-auto mini:tw-justify-start",children:[(0,r.jsx)("div",{className:"tw-text-xs",children:e}),(0,r.jsx)("button",{type:"button","aria-label":"refresh-button",className:"tw-w-8 tw-h-8 tw-block tw-leading-8 before-font-material before:tw-content-['\\e5d5'] before:tw-leading-8 before:tw-text-center",onClick:s})]})]}),(0,r.jsxs)("div",{className:"tw-py-16 tw-px-4 tw-rounded-lg tw-shadow-[0_1px_3px_0_rgba(51,51,51,0.4)]",children:[(0,r.jsx)("div",{className:"tw-text-xl tw-text-center tw-leading-10 tw-text-wine tw-break-all tw-mb-2.5",children:u}),(0,r.jsx)("div",{className:"tw-leading-8 tw-text-sm mini:tw-text-base",children:(0,r.jsx)(f.Z,{id:a,wordsList:c,partsList:d,hasBrackets:!0,hasTextCenter:!0,hasSpeechButton:!0,onSpeech:function(){o(u)}})})]})]})},h=function(t){return t<10?"0".concat(t):"".concat(t)},w=function(t,e){var n=e-t;return Math.floor(Math.random()*n+t)},v={id:"",en:"",zh:[],parts:[],alphabet:""},$=function(t,e){var n=t[w(0,t.length-1)];return{id:n.id,date:e,word:n}},m=function(t){return JSON.parse(JSON.stringify(t))},g=function(){s().extend(a());var t=s()(),e=(0,c.v9)((function(t){return t.collection.words})),n=(0,u.useState)(""),i=n[0],o=n[1],f=(0,u.useState)(""),l=f[0],w=f[1],g=(0,u.useState)(m(v)),p=g[0],y=g[1],S=function(t){var e=t.id,n=t.date,r=t.word;y(r),localStorage.setItem("dailyWord",JSON.stringify({id:e,date:n}))},b=(0,u.useCallback)((function(){for(var t={id:p.id,date:i,word:m(p)};t.id===p.id;)t=$(e,i);S(t)}),[p,i,e]);return(0,u.useEffect)((function(){var e=t.utcOffset(8).year(),n=t.utcOffset(8).month()+1,r=t.utcOffset(8).date();o("".concat(e,"-").concat(n,"-").concat(r)),w("".concat(e,"\u5e74").concat(h(n),"\u6708").concat(h(r),"\u65e5"))}),[t]),(0,u.useEffect)((function(){if(i&&e.length>0){var t=localStorage.getItem("dailyWord")||"",n={id:"",date:"",word:m(v)};if(!0===!!localStorage.getItem("dailyWord")){var r=JSON.parse(t),s=r.id,o=r.date;n=o===i?{id:s,date:o,word:e.filter((function(t){return t.id===s}))[0]}:$(e,i)}else n=$(e,i);S(n)}}),[i,e]),(0,r.jsx)("div",{className:"content size-small tw-py-5",children:(0,r.jsx)(d,{dateCaption:l,wordData:p,onFresh:b})})}},3347:function(t,e,n){"use strict";var r=n(7294),i=n(5827);e.Z=function(){var t=(0,i.h5)(),e=t.speak,n=t.speaking;return(0,r.useCallback)((function(t){!1===n&&e({text:t})}),[e,n])}},5301:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8593)}])},5827:function(t,e,n){"use strict";var r=n(219);var i=n(4989);function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"h5",{enumerable:!0,get:function(){return s(i).default}})},219:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,i=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(u){i=!0,s=u}finally{try{!r&&a.return&&a.return()}finally{if(i)throw s}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=n(7294);var s=function(t,e){var n=(0,i.useRef)((function(){throw new Error("Cannot call an event handler while rendering.")}));return(0,i.useEffect)((function(){n.current=t}),[t].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e))),(0,i.useCallback)((function(t){return(0,n.current)(t)}),[n])};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.onEnd,n=void 0===e?function(){}:e,o=t.onResult,a=void 0===o?function(){}:o,u=t.onError,c=void 0===u?function(){}:u,f=(0,i.useRef)(null),l=(0,i.useState)(!1),d=r(l,2),h=d[0],w=d[1],v=(0,i.useState)(!1),$=r(v,2),m=$[0],g=$[1],p=function(t){var e=Array.from(t.results).map((function(t){return t[0]})).map((function(t){return t.transcript})).join("");a(e)},y=function(t){"not-allowed"===t.error&&(f.current.onend=function(){},w(!1)),c(t)},S=s((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!h&&m){var e=t.lang,n=void 0===e?"":e,r=t.interimResults,i=void 0===r||r,s=t.continuous,o=void 0!==s&&s,a=t.maxAlternatives,u=void 0===a?1:a,c=t.grammars;w(!0),f.current.lang=n,f.current.interimResults=i,f.current.onresult=p,f.current.onerror=y,f.current.continuous=o,f.current.maxAlternatives=u,c&&(f.current.grammars=c),f.current.onend=function(){return f.current.start()},f.current.start()}}),[h,m,f]),b=s((function(){h&&m&&(f.current.onresult=function(){},f.current.onend=function(){},f.current.onerror=function(){},w(!1),f.current.stop(),n())}),[h,m,f,n]);return(0,i.useEffect)((function(){"undefined"!==typeof window&&(window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition,window.SpeechRecognition&&(g(!0),f.current=new window.SpeechRecognition))}),[]),{listen:S,listening:h,stop:b,supported:m}}},4989:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,i=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(r=(o=a.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(u){i=!0,s=u}finally{try{!r&&a.return&&a.return()}finally{if(i)throw s}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=n(7294);e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.onEnd,n=void 0===e?function(){}:e,s=(0,i.useState)([]),o=r(s,2),a=o[0],u=o[1],c=(0,i.useState)(!1),f=r(c,2),l=f[0],d=f[1],h=(0,i.useState)(!1),w=r(h,2),v=w[0],$=w[1],m=function(t){u(t)},g=function(){var t=window.speechSynthesis.getVoices();t.length>0?m(t):window.speechSynthesis.onvoiceschanged=function(e){t=e.target.getVoices(),m(t)}},p=function(){d(!1),n()};(0,i.useEffect)((function(){"undefined"!==typeof window&&window.speechSynthesis&&($(!0),g())}),[]);var y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.voice,n=void 0===e?null:e,r=t.text,i=void 0===r?"":r,s=t.rate,o=void 0===s?1:s,a=t.pitch,u=void 0===a?1:a,c=t.volume,f=void 0===c?1:c;if(v){d(!0);var l=new window.SpeechSynthesisUtterance;l.text=i,l.voice=n,l.onend=p,l.rate=o,l.pitch=u,l.volume=f,window.speechSynthesis.speak(l)}},S=function(){v&&(d(!1),window.speechSynthesis.cancel())};return{supported:v,speak:y,speaking:l,cancel:S,voices:a}}}},function(t){t.O(0,[774,888,179],(function(){return e=5301,t(t.s=e);var e}));var e=t.O();_N_E=e}]);