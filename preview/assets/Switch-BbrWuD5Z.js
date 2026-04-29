import{j as e}from"./index-Wf_nRSxg.js";const f=({onChange:c,disabled:r=!1,checked:t=!1,paleStyle:o=!0,disabledColorful:n=!1,className:s})=>{const i="bg-grey-extra-light opacity-60",l="border-grey-light",d="cursor-not-allowed",h=o?"bg-yellow-light":"bg-yellow-accent-light",g=o?"bg-white":"bg-grey-extra-light",a=o?"border-yellow-accent-dark":"border-yellow-accent-light",u=o?"border-grey-blue-light":"border-grey-dark",b="outline-transparent",x=o?"outline-grey-blue-light":"outline-grey-dark",k="bg-white",w=o?"bg-grey-light":"bg-grey-dark",C="border-white",$=o?"border-white":"border-grey-extra-light",p=()=>{r||c(!t)};return e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"checkbox",checked:t,className:"hidden",onChange:()=>{},disabled:r}),e.jsx("div",{className:`
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
          ${r&&!n&&`${i} ${l}`}
          ${r?`${d}`:"cursor-pointer"}
          ${(!r||n)&&(t?`${h} ${a} ${b}`:`${g} ${u} ${x}`)}
          ${s}
        `,onClick:p,children:e.jsx("span",{className:`
            absolute
            w-[24px]
            h-[24px]
            border-4
            rounded-full
            top-[3px]
            transition-[background-color,border-color,left]
            duration-300
            ease-in-out
            ${t?`${k} ${C}  left-[23px]`:`${w} ${$} left-[3px]`}
          `})})]})};export{f as S};
