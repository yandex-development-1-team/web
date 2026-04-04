import{r as n,j as l,c as g,f as p,d as x}from"./index-0FBSZdKC.js";import{b as f,d as b,c as i}from"./ReactCrop-D2WIWZg8.js";const v=({title:a,titleId:e,...s})=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":e,...s},a?n.createElement("title",{id:e},a):null,n.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M8 16h8m0 0h8m-8 0V8m0 8v8"})),m=f(`
    group inline-flex items-center justify-between w-full rounded-lg button-text font-button
    transition-all outline-none cursor-pointer
    focus-visible:ring-2 focus-visible:ring-yellow-accent-dark focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,{variants:{variant:{default:`
          bg-white ring-1 ring-inset ring-yellow-accent-light text-black hover:ring-yellow-light
          active:ring-2 active:ring-yellow-accent-dark
        `,filled:"bg-yellow-accent-light text-black hover:bg-yellow-light active:bg-yellow-accent-dark"},size:{default:"h-[92px] p-5",small:"h-[72px] p-4"}},defaultVariants:{variant:"default",size:"default"}}),h={users:x,special_projects:p,box:g};function j({className:a,variant:e="default",size:s="default",asChild:r=!1,icon:t,children:c,...d}){const u=r?b:"button",o=t?h[t]:null;return l.jsxs(u,{"data-slot":"button","data-variant":e,"data-size":s,className:i(m({variant:e,size:s,className:a})),...d,children:[l.jsxs("div",{className:"flex items-center gap-3",children:[o&&l.jsx(o,{className:`
              ${t==="box"&&"w-[37px] text-text-black-natural"}
              ${t==="special_projects"&&"w-[31px]"}
              ${t==="users"&&"w-[42px]"}
              shrink-0
            `}),c]}),l.jsx("div",{className:i("flex size-12 shrink-0 items-center justify-center rounded-lg transition-all",e==="filled"?"bg-white":"bg-yellow-accent-light group-hover:bg-yellow-light group-active:bg-yellow-accent-dark"),children:l.jsx(v,{className:"size-6"})})]})}export{j as B,v as S};
