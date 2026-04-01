import{r,h as g,j as t}from"./index-BFWUgzGW.js";import{S as p}from"./Close-xER5g-_N.js";import{B as b}from"./Button-6WZ92Fv3.js";const E=({isOpen:a,onClose:o,title:s,children:x,footer:i,showBorders:l=!0,className:u,overlayClassName:f})=>{const[d,c]=r.useState(!1);a&&!d&&c(!0);const n=r.useRef(null);return r.useEffect(()=>{const e=h=>{if(h.key==="Escape"&&n.current){const m=document.querySelectorAll("[data-modal-container]"),y=m[m.length-1];n.current===y&&o()}};return a&&(window.addEventListener("keydown",e),document.body.style.overflow="hidden",document.body.scrollHeight>window.innerHeight+1&&(document.body.style.marginRight="8px")),()=>{window.removeEventListener("keydown",e),document.body.style.overflow="",document.body.style.marginRight=""}},[a,o]),d?g.createPortal(t.jsx("div",{"data-modal-container":!0,ref:n,className:`
        fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
        ${a?"animate-fade-in":"animate-fade-out pointer-events-none"}
        ${f}
      `,onMouseDown:o,onAnimationEnd:e=>{e.target===e.currentTarget&&e.animationName==="fade-out"&&!a&&c(!1)},children:t.jsxs("div",{className:`
          flex max-h-[90vh] w-full max-w-157 flex-col rounded-xl bg-white font-display shadow-lg
          ${a?"animate-modal-in":"animate-modal-out pointer-events-none"}
          ${u}
        `,onMouseDown:e=>e.stopPropagation(),children:[t.jsxs("header",{className:`
            flex items-center justify-between px-6 py-[19px_17px] ${l?"border-b border-grey-blue-light":""}
          `,children:[s&&t.jsx("h3",{className:"m-0 text-h3 text-text",children:s}),t.jsx(b,{variant:"ghost",size:"icon-32",onClick:o,"aria-label":"Закрыть модальное окно",className:"text-text-grey-dark hover:text-text-grey-light active:text-text",children:t.jsx(p,{className:"min-w-[26px] min-h-[26px]"})})]}),t.jsx("div",{className:"flex-1 overflow-y-auto p-6 text-text",children:x}),i&&t.jsx("footer",{className:`
              flex items-center justify-end gap-3 px-6 py-[23px_24px]
              ${l?"border-t border-grey-blue-light":""}
            `,children:i})]})}),document.body):null};export{E as M};
