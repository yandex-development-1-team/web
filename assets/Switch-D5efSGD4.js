import{j as r}from"./index-iDezcY-f.js";const m=({onChange:n,disabled:e=!1,checked:t=!1,paleStyle:o=!0,className:c})=>{const i="bg-grey-extra-light opacity-60",l="border-grey-light",s="cursor-not-allowed",d=o?"bg-yellow-light":"bg-yellow-accent-light",h=o?"bg-white":"bg-grey-extra-light",g=o?"border-yellow-accent-dark":"border-yellow-accent-light",a=o?"border-grey-blue-light":"border-grey-dark",u="outline-transparent",b=o?"outline-grey-blue-light":"outline-grey-dark",x="bg-white",k=o?"bg-grey-light":"bg-grey-dark",C="border-white",w=o?"border-white":"border-grey-extra-light",$=()=>{e||n(!t)};return r.jsxs(r.Fragment,{children:[r.jsx("input",{type:"checkbox",checked:t,className:"hidden",onChange:()=>{},disabled:e}),r.jsx("div",{className:`
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
          ${e?`${i} ${l} ${s}`:"cursor-pointer"}
          ${!e&&(t?`${d} ${g} ${u}`:`${h} ${a} ${b}`)}
          ${c}
        `,onClick:$,children:r.jsx("span",{className:`
            absolute
            w-[24px]
            h-[24px]
            border-4
            rounded-full
            top-[3px]
            transition-[background-color,border-color,left]
            duration-300
            ease-in-out
            ${t?`${x} ${C}  left-[23px]`:`${k} ${w} left-[3px]`}
          `})})]})};export{m as S};
