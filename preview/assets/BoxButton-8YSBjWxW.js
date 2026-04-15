import{r as n,J as x,j as l,$ as p,o as f,a0 as m,l as b,d as r}from"./index-DcQiRUs6.js";const v=({title:a,titleId:e,...s})=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":e,...s},a?n.createElement("title",{id:e},a):null,n.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M8 16h8m0 0h8m-8 0V8m0 8v8"})),w=x(`
    group inline-flex items-center justify-between w-full rounded-lg button-text font-button
    transition-all outline-none cursor-pointer
    focus-visible:ring-2 focus-visible:ring-yellow-accent-dark focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,{variants:{variant:{default:`
          bg-white ring-1 ring-inset ring-yellow-accent-light text-black hover:ring-yellow-light
          active:ring-2 active:ring-yellow-accent-dark
        `,filled:"bg-yellow-accent-light text-black hover:bg-yellow-light active:bg-yellow-accent-dark"},size:{default:"h-[92px] p-5",small:"h-[72px] p-4"}},defaultVariants:{variant:"default",size:"default"}}),h={users:b,special_projects:m,box:f};function j({className:a,variant:e="default",size:s="default",asChild:i=!1,icon:t,smallIcon:c=!1,children:u,...d}){const g=i?p:"button",o=t?h[t]:null;return l.jsxs(g,{"data-slot":"button","data-variant":e,"data-size":s,className:r(w({variant:e,size:s,className:a})),...d,children:[l.jsxs("div",{className:"flex items-center gap-[7px]",children:[o&&l.jsx(o,{className:`
              ${t==="box"&&"w-[37px] text-text-black-natural -ml-[7px]"}
              ${t==="special_projects"&&(c?"w-[31px]":"w-[42px] -ml-[10px] -mr-[5px]")}
              ${t==="users"&&"w-[42px] -ml-[10px] -mr-[5px]"}
              shrink-0
            `}),u]}),l.jsx("div",{className:r("flex size-12 shrink-0 items-center justify-center rounded-lg transition-all",e==="filled"?"bg-white":"bg-yellow-accent-light group-hover:bg-yellow-light group-active:bg-yellow-accent-dark"),children:l.jsx(v,{className:"size-8"})})]})}export{j as B,v as S};
