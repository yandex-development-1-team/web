import{r as n,j as l,d as g,h as p,e as x}from"./index-CbYfGNX9.js";import{a as f,S as b,c as i}from"./utils.clsx-Dy_b2QS0.js";const v=({title:a,titleId:e,...s})=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":e,...s},a?n.createElement("title",{id:e},a):null,n.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M8 16h8m0 0h8m-8 0V8m0 8v8"})),h=f(`
    group inline-flex items-center justify-between w-full rounded-lg text-button font-button
    transition-all outline-none cursor-pointer
    focus-visible:ring-2 focus-visible:ring-yellow-accent-dark focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,{variants:{variant:{default:`
          bg-white ring-1 ring-inset ring-yellow-accent-light text-black hover:ring-yellow-light
          active:ring-2 active:ring-yellow-accent-dark
        `,filled:"bg-yellow-accent-light text-black hover:bg-yellow-light active:bg-yellow-accent-dark"},size:{default:"h-[92px] p-5",small:"h-[72px] p-4"}},defaultVariants:{variant:"default",size:"default"}}),m={users:x,special_projects:p,box:g};function j({className:a,variant:e="default",size:s="default",asChild:r=!1,icon:t,children:c,...u}){const d=r?b:"button",o=t?m[t]:null;return l.jsxs(d,{"data-slot":"button","data-variant":e,"data-size":s,className:i(h({variant:e,size:s,className:a})),...u,children:[l.jsxs("div",{className:"flex items-center gap-3",children:[o&&l.jsx(o,{className:`
              ${t==="box"&&"w-[37px] text-text-black-natural"}
              ${t==="special_projects"&&"w-[31px]"}
              ${t==="users"&&"w-[42px]"}
              shrink-0
            `}),c]}),l.jsx("div",{className:i("flex size-12 shrink-0 items-center justify-center rounded-lg transition-all",e==="filled"?"bg-white":"bg-yellow-accent-light group-hover:bg-yellow-light group-active:bg-yellow-accent-dark"),children:l.jsx(v,{className:"size-6"})})]})}export{j as B};
