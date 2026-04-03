import{j as r}from"./index-BDAOK5Wg.js";const C=({onChange:t,checked:e=!1,paleStyle:o=!0,className:n})=>{const c=()=>{t(!e)},i=o?"bg-yellow-light":"bg-yellow-accent-light",d=o?"bg-white":"bg-grey-extra-light",l=o?"border-yellow-accent-dark":"border-yellow-accent-light",s=o?"border-grey-blue-light":"border-grey-dark",h="outline-transparent",a=o?"outline-grey-blue-light":"outline-grey-dark",u="bg-white",g=o?"bg-grey-light":"bg-grey-dark",b="border-white",k=o?"border-white":"border-grey-extra-light";return r.jsxs(r.Fragment,{children:[r.jsx("input",{type:"checkbox",checked:e,className:"hidden",onChange:()=>{}}),r.jsx("div",{className:`
          w-[52px]
          h-[32px]
          rounded-[16px]
          relative
          transition-[background-color,border-color,outline-color]
          duration-300
          ease-in-out
          border-1
          outline-2
          outline-offset-[-2px]
          cursor-pointer
          ${e?`${i} ${l} ${h}`:`${d} ${s} ${a}`}
          ${n}
        `,onClick:c,children:r.jsx("span",{className:`
            absolute
            w-[24px]
            h-[24px]
            border-4
            rounded-full
            top-[3px]
            transition-[background-color,border-color,left]
            duration-300
            ease-in-out
            ${e?`${u} ${b}  left-[23px]`:`${g} ${k} left-[3px]`}
          `})})]})};export{C as S};
