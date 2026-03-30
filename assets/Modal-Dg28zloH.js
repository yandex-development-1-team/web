import{r,c as y,j as t}from"./index-D3MoltXn.js";import{S as g}from"./Close-Dq_FYO-x.js";import{B as v}from"./Button-Dhg1jzgM.js";const E=({isOpen:a,onClose:o,title:s,children:m,footer:l,showBorders:i=!0,className:u,overlayClassName:f})=>{const[d,c]=r.useState(!1);a&&!d&&c(!0);const n=r.useRef(null);return r.useEffect(()=>{const e=h=>{if(h.key==="Escape"&&n.current){const x=document.querySelectorAll("[data-modal-container]"),p=x[x.length-1];n.current===p&&o()}};return a&&(window.addEventListener("keydown",e),document.body.style.overflow="hidden"),()=>{window.removeEventListener("keydown",e),document.body.style.overflow=""}},[a,o]),d?y.createPortal(t.jsx("div",{"data-modal-container":!0,ref:n,className:`
        fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
        ${a?"animate-fade-in":"animate-fade-out pointer-events-none"}
        ${f}
      `,onMouseDown:o,onAnimationEnd:e=>{e.target===e.currentTarget&&e.animationName==="fade-out"&&!a&&c(!1)},children:t.jsxs("div",{className:`
          flex max-h-[90vh] w-full max-w-157 flex-col rounded-xl bg-white font-display shadow-lg
          ${a?"animate-modal-in":"animate-modal-out pointer-events-none"}
          ${u}
        `,onMouseDown:e=>e.stopPropagation(),children:[t.jsxs("header",{className:`
            flex items-center justify-between px-6 py-[19px_17px] ${i?"border-b border-grey-blue-light":""}
          `,children:[s&&t.jsx("h3",{className:"m-0 text-h3 text-text",children:s}),t.jsx(v,{variant:"ghost",size:"icon-32",onClick:o,"aria-label":"Закрыть модальное окно",className:"text-text-grey-dark hover:text-text-grey-light active:text-text",children:t.jsx(g,{className:"min-w-[26px] min-h-[26px]"})})]}),t.jsx("div",{className:"flex-1 overflow-y-auto p-6 text-text",children:m}),l&&t.jsx("footer",{className:`
              flex items-center justify-end gap-3 px-6 py-[23px_24px]
              ${i?"border-t border-grey-blue-light":""}
            `,children:l})]})}),document.body):null};export{E as M};
