(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[186],{940:function(e,t,n){"use strict";n.d(t,{Ph:function(){return o},oH:function(){return s},KM:function(){return c}});var a=n(5893),r=n(7294),i=n(1898),l=n.n(i),o=function(e){var t=e.options,n=e.onChange,i=(0,r.useState)(""),o=i[0],s=i[1];(0,r.useEffect)((function(){var e=t.length>0?t[0].value:"";s(e)}),[t]);return(0,a.jsx)("div",{className:l().select,children:(0,a.jsx)("select",{value:o,onChange:function(e){s(e.target.value),n(e)},children:t.map((function(e){var t=e.value,n=e.name;return(0,a.jsx)("option",{value:t,children:n},t)}))})})},s=function(e){var t=e.defaultValue,n=void 0===t?"":t,r=e.placeholder,i=void 0===r?"":r,l=e.onChange;return(0,a.jsx)("input",{type:"text",className:"tw-w-full tw-h-10 tw-block tw-py-3 tw-px-4 tw-leading-4 tw-rounded-md tw-text-xs tw-bg-gray-light",value:n,onChange:l,placeholder:i})},c=function(e){var t=e.text,n=void 0===t?"":t,i=e.colorStyle,l=void 0===i?"green":i,o=e.isDisabled,s=void 0!==o&&o,c=e.onClick,u=void 0===c?function(){}:c,d=(0,r.useMemo)((function(){switch(l){case"red":return"tw-bg-red desktop:hover:tw-bg-wine";case"green-dark":return"tw-bg-green-dark desktop:hover:tw-bg-green";default:return"tw-bg-green desktop:hover:tw-bg-green-dark"}}),[l]);return(0,a.jsx)("button",{type:"button",className:"tw-min-w-105 tw-py-2 tw-px-5 tw-mx-1.5 tw-inline-block tw-text-sm tw-text-center tw-text-white tw-rounded-lg tw-leading-6 ".concat(s?"tw-bg-gray-dark tw-cursor-not-allowed":d),onClick:u,title:n,children:n})}},849:function(e,t,n){"use strict";n.r(t);var a=n(5893),r=n(1385),i=n(7294),l=n(9704),o=n(3626),s=n(4948),c=n(940),u=n(686),d=n(2143),w=n(1858),m=n(39);t.default=function(){var e=w.partsOptionsData,t=m.alphabetOptionsData,n=(0,u.Z)(),f=(0,d.Z)(),b=(0,l.v9)((function(e){return e.collection.words})),h=(0,l.v9)((function(e){return e.collection.parts})),p=(0,l.v9)((function(e){return e.common})),g=p.scrollValue,v=p.screenWidth,x=(0,i.useState)(!1),j=x[0],N=x[1],_=(0,i.useState)([]),y=_[0],k=_[1],C=(0,i.useState)([]),S=C[0],E=C[1],O=(0,i.useState)(0),Z=O[0],D=O[1],M=(0,i.useState)(0),P=M[0],z=M[1],H=(0,i.useState)("all"),L=H[0],I=H[1],J=(0,i.useState)([]),T=J[0],V=J[1],X=(0,i.useState)("all"),B=X[0],F=X[1],K=(0,i.useState)([]),W=K[0],q=K[1],A=(0,i.useState)(!1),G=A[0],Q=A[1],R=(0,i.useCallback)((function(){f();var e=(0,r.Z)(b).filter((function(e){var t=e.alphabet,n=e.parts,a=new Set(n);return"all"===B&&"all"===L||("all"===B?a.has(L):"all"===L?t===B:t===B&&a.has(L))})).sort((function(e,t){var n=e.en.toLocaleLowerCase(),a=t.en.toLocaleLowerCase();return n>a?!1===G?1:-1:n<a?!1===G?-1:1:0})),t=e.length;k(e),D(1),z(Math.floor(t/50)+(t%50>0?1:0))}),[b,L,B,G]),U=(0,i.useMemo)((function(){return S.map((function(e,t){return(0,a.jsx)(s.Z,{id:e.id,length:S.length,index:t,children:(0,a.jsx)(o.Z,{wordItem:e})})}))}),[S]),Y=(0,i.useMemo)((function(){return(0,a.jsxs)("div",{className:"tw-text-yellow tw-text-xs",children:["\u5171",(0,a.jsx)("span",{className:"tw-mx-1",children:y.length}),"\u7b46\u8cc7\u6599"]})}),[y]);return(0,i.useEffect)((function(){return N(!0),function(){return N(!1)}}),[]),(0,i.useEffect)((function(){if(j){var n=["all"].concat((0,r.Z)(h)).map((function(t){return{name:e.filter((function(e){return e.id===t}))[0].name||t,value:t}})),a=t.map((function(e){var t=e.id;return{name:e.name,value:t}}));I("all"),F("all"),V(n),q(a)}}),[j,h,t,e]),(0,i.useEffect)((function(){j&&R()}),[j,R,b,L,B,G]),(0,i.useEffect)((function(){var e=window.innerHeight,t=function(){if(v<1025){var e=document.getElementById("__main");if(null!==e)return e.offsetHeight}return document.body.clientHeight}();g+e>=t-e/2&&(Z<P&&D(Z+1))}),[g,v]),(0,i.useEffect)((function(){if(Z>0&&y.length){var e=50*(Z-1),t=50*Z,n=y.slice(e,t),a=[].concat((0,r.Z)(S),(0,r.Z)(n));E(1===Z?n:a)}else E([])}),[Z,y]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{className:"title",children:"\u55ae\u5b57\u5217\u8868"}),(0,a.jsx)("div",{className:"content size-large tw-p-0 tw-rounded-none tw-bg-transparent",children:(0,a.jsxs)("div",{className:"tablet:tw-flex tablet:tw-items-center tablet:tw-justify-between",children:[v>767&&Y,(0,a.jsxs)("div",{className:"tw-flex tw-items-center tw-flex-wrap tw-justify-end",children:[(0,a.jsx)("div",{className:"tw-w-6/12 tw-pr-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pr-0",children:(0,a.jsx)(c.Ph,{options:W,onChange:function(e){return F(e.target.value)}})}),(0,a.jsx)("div",{className:"tw-w-6/12 tw-pl-1 tw-mb-2.5 tw-leading-none tablet:tw-w-auto tablet:tw-mr-2.5 tablet:tw-mb-0 tablet:tw-pl-0",children:(0,a.jsx)(c.Ph,{options:T,onChange:function(e){return I(e.target.value)}})}),(0,a.jsxs)("div",{className:"tw-w-full tw-flex tw-items-center tw-justify-between tablet:tw-justify-start tablet:tw-w-auto",children:[v<768&&Y,(0,a.jsxs)("div",{className:"tw-flex tw-items-center tablet:tw-justify-start",children:[(0,a.jsx)("div",{className:"tw-mr-2.5 tw-leading-none tablet:tw-mb-0",children:(0,a.jsx)("button",{type:"button",className:"tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg tw-flex tw-justify-center tw-items-center before:tw-w-5 before:tw-h-5 before:tw-block before:tw-bg-no-repeat before:tw-bg-center before:tw-bg-contain ".concat(G?'before:tw-bg-[url("../public/img/alphabet_z_to_a.svg")]':'before:tw-bg-[url("../public/img/alphabet_a_to_z.svg")]'),"aria-label":"sort-alpha-button",onClick:function(){return Q(!G)}})}),(0,a.jsx)("div",{className:"tw-mr-0 tw-leading-none tablet:tw-mb-0",children:(0,a.jsx)("button",{type:"button",className:"tw-w-10 tw-h-10 tw-bg-white tw-rounded-lg before-font-material before:tw-content-['\\e5d5'] before:tw-text-center before:tw-leading-10 before:tw-text-black","aria-label":"data-update-button",onClick:n})})]})]})]})]})}),(0,a.jsx)("div",{className:"content size-large",children:S.length?(0,a.jsx)("ul",{className:"tw-flex tw-flex-wrap",children:U}):(0,a.jsx)("div",{className:"tw-text-center tw-text-gray tw-py-8",children:"\u76ee\u524d\u6c92\u6709\u8cc7\u6599"})})]})}},5028:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/collection",function(){return n(849)}])},1898:function(e){e.exports={select:"form_select__100yN"}},39:function(e){"use strict";e.exports=JSON.parse('{"alphabetOptionsData":[{"id":"all","name":"\u5168\u90e8\u5b57\u6bcd"},{"id":"a","name":"A"},{"id":"b","name":"B"},{"id":"c","name":"C"},{"id":"d","name":"D"},{"id":"e","name":"E"},{"id":"f","name":"F"},{"id":"g","name":"G"},{"id":"h","name":"H"},{"id":"i","name":"I"},{"id":"j","name":"J"},{"id":"k","name":"K"},{"id":"l","name":"L"},{"id":"m","name":"M"},{"id":"n","name":"N"},{"id":"o","name":"O"},{"id":"p","name":"P"},{"id":"q","name":"Q"},{"id":"r","name":"R"},{"id":"s","name":"S"},{"id":"t","name":"T"},{"id":"u","name":"U"},{"id":"v","name":"V"},{"id":"w","name":"W"},{"id":"x","name":"X"},{"id":"y","name":"Y"},{"id":"z","name":"Z"}]}')},1858:function(e){"use strict";e.exports=JSON.parse('{"partsOptionsData":[{"id":"adj","name":"adj \u5f62\u5bb9\u8a5e"},{"id":"adv","name":"adv \u526f\u8a5e"},{"id":"conj","name":"conj \u9023\u63a5\u8a5e"},{"id":"n","name":"n \u540d\u8a5e"},{"id":"num","name":"num \u6578\u8a5e"},{"id":"phrase","name":"phrase \u7247\u8a9e"},{"id":"prep","name":"prep \u4ecb\u7cfb\u8a5e"},{"id":"pron","name":"pron \u4ee3\u540d\u8a5e"},{"id":"v","name":"v \u52d5\u8a5e"},{"id":"vi","name":"vi \u4e0d\u53ca\u7269\u52d5\u8a5e"},{"id":"vt","name":"vt \u53ca\u7269\u52d5\u8a5e"},{"id":"all","name":"\u5168\u90e8\u985e\u5225"}]}')}},function(e){e.O(0,[293,774,888,179],(function(){return t=5028,e(e.s=t);var t}));var t=e.O();_N_E=t}]);