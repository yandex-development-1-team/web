import{r,j as e,c as u,L as v,f as x,h as j,i as b,k as w,l as k}from"./index-BSNveA1x.js";import{B as h}from"./BoxButton-gmxNnOgN.js";import{C as g}from"./Card-DAWYRbFn.js";import{T as N}from"./ToggleButton-DDV8PEzF.js";import{B as y}from"./BoxSolutionModal-Dve1-vhy.js";import{gi as C}from"./schemas-kU6IFNjY.js";import{S}from"./Phone-DvDVJbzq.js";import{P as E,a as L,b as M}from"./CalendarInput-DFLcodpR.js";import{u as B}from"./useModal-lxio3vbD.js";import"./Check-C5Jmzrh_.js";import"./Close-oqpf_lPH.js";import"./Input-A6em05Cl.js";import"./Modal-DeNAx6D3.js";import"./Switch-a62_JRVT.js";import"./index.esm-DvBQOJbR.js";import"./Select-FJ51OpFf.js";import"./tslib.es6-BUas5LQb.js";const D=({title:t,titleId:a,...s})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":a,...s},t?r.createElement("title",{id:a},t):null,r.createElement("path",{fill:"currentColor",d:"M7.403 27.957a3.439 3.439 0 0 1-3.334-3.64c-.016-2.87 0-5.741 0-8.612a.667.667 0 1 1 1.334 0c0 2.934-.043 5.867 0 8.8.021 1.476 1.13 2.119 2.45 2.119h16.618a2.066 2.066 0 0 0 1.962-1.29c.129-.46.174-.94.134-1.415v-8.214a.666.666 0 1 1 1.333 0c0 2.966.113 5.954 0 8.916a3.421 3.421 0 0 1-3.56 3.334l-16.937.002Z"}),r.createElement("path",{fill:"currentColor",d:"M16.45 4.235a.613.613 0 0 0-.415-.184.13.13 0 0 1-.058-.008c-.029-.011-.036 0-.054.008a.613.613 0 0 0-.416.184l-4.892 4.892a.667.667 0 0 0 .942.942l3.755-3.753v14.323a.667.667 0 1 0 1.333 0V6.316l3.755 3.753a.667.667 0 0 0 .943-.942l-4.894-4.892Z"})),P=({title:t,titleId:a,...s})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":a,...s},t?r.createElement("title",{id:a},t):null,r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:1.5,d:"M4 25.273v-1.091a7.636 7.636 0 1 1 15.273 0v1.09"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:1.5,d:"M17.09 18.727a5.455 5.455 0 0 1 10.91 0v.546"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M11.636 16.546a4.364 4.364 0 1 0 0-8.728 4.364 4.364 0 0 0 0 8.728Zm10.91-3.273a3.273 3.273 0 1 0 0-6.546 3.273 3.273 0 0 0 0 6.546Z"})),T=({title:t,titleId:a,...s})=>r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20","aria-labelledby":a,...s},t?r.createElement("title",{id:a},t):null,r.createElement("path",{stroke:"#4b5974",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M10.001 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666"}),r.createElement("path",{stroke:"#4b5974",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10.001 5a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666m0 11.667a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667"})),V=({data:t,className:a,...s})=>{const{title:o,value:i,warningColor:l,largeValueSize:c}=t;return e.jsxs("div",{className:u("flex flex-col gap-2 text-text w-full min-w-30",a),...s,children:[e.jsx("p",{className:"text-xxs",children:o}),e.jsx("div",{className:u("flex justify-center items-center","border border-grey-light rounded-lg","bg-white h-full"),children:e.jsx("span",{className:`${c?"text-indicator":"text-indicator-st"} 
          ${l?"text-red-dark":"text-text"}`,children:i})})]})},A=({cards:t,className:a,...s})=>e.jsx("div",{className:u("flex gap-5",a),...s,children:t.map((o,i)=>e.jsx(V,{data:o},i))}),O=`
  group 
  flex 
  flex-col 
  gap-[20px]
  justify-between 
  min-h-[280px]
  h-full 
  p-[20px] 
  rounded-[8px] 
  border 
  border-grey-border 
  bg-white
  transition-all 
  cursor-pointer
  shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]
  
  hover:border-yellow-light
  hover:shadow-none

  active:border-yellow-accent-dark
  active:border-2
  active:shadow-none
`,W=`
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  shrink-0
  rounded-[8px]
  pointer-events-none
  self-end
  h-[46px]
  px-8
  py-3
  
  border-1
  border-yellow-accent-light
  text-text
  button-text
  bg-white
  outline-2
  outline-transparent
  outline-offset-[-2px]
  
  transition-[background-color,border-color,outline-color,color]
  duration-300
  ease-in-out

  group-hover:border-yellow-light
  group-active:border-yellow-accent-dark
`,_=({to:t,icon:a,title:s,description:o,detailsLabel:i="Подробнее",iconSize:l})=>e.jsx(v,{to:t,children:e.jsxs("article",{className:O,style:{paddingTop:l?Math.round(-.615*l+40):20},children:[e.jsxs("div",{className:"flex flex-col",style:{gap:l?Math.round(-.615*l+40):20},children:[e.jsx(a,{className:"text-grey-dark",width:l??32,height:l??32,style:{marginLeft:l?Math.round(-.769*l+24.615):0}}),e.jsxs("div",{className:"flex flex-col gap-[10px]",children:[e.jsx("h4",{className:"text-h4sb text-black-dark",children:s}),e.jsx("p",{className:"text-h5",children:o})]})]}),e.jsx("div",{className:W,children:i})]})}),z=({name:t,grade:a,isActive:s,email:o,phone:i})=>{const[l,c]=r.useState(!1),m=[{link:o,action:"Написать",Icon:C,iconClassName:"w-[16px]"},{link:i,action:"Позвонить",Icon:S,iconClassName:"w-[32px] -mr-[6px]"}];return e.jsxs("div",{className:"flex items-start justify-between pb-[9px] border-b border-grey-light",children:[e.jsxs("div",{className:"flex gap-[9px]",children:[e.jsx("div",{className:`${s?"bg-yellow-accent-dark":"bg-grey-extra-light"} h-[14px] w-[14px] rounded-full mt-[4px] ml-[4px]`}),e.jsxs("div",{className:"flex flex-col gap-[4px]",children:[e.jsx("span",{className:"text-xs",children:t}),e.jsx("span",{className:"text-xxs",children:`Менеджер ${a} звена`})]})]}),e.jsxs(E,{open:l,onOpenChange:c,children:[e.jsx(L,{children:e.jsx(T,{width:20,className:"cursor-pointer",onClick:()=>c(!0)})}),e.jsx(M,{className:"w-[144px] bg-white border border-grey-light px-[12px] py-[10px] z-100 rounded-[8px] shadow-(--popover-shadow)",align:"end",onOpenAutoFocus:p=>p.preventDefault(),children:e.jsx("ul",{className:"flex flex-col gap-[10px]",children:m.map(({link:p,action:n,Icon:d,iconClassName:f})=>e.jsx("li",{children:e.jsxs("a",{href:p,className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-xs text-text",children:n}),e.jsx(d,{color:"var(--color-grey-dark)",className:f})]})}))})})]})]})},Z=[{to:x.statsAttendance,icon:P,title:"Средняя посещаемость на коробку",description:"Статистика за выбранный период"},{to:x.statsApplications,icon:j,iconSize:45,title:"Работа с заявками",description:"Модерация заявок"},{to:x.statsPopularity,icon:b,iconSize:45,title:"Популярность коробочных решений",description:"Рейтинг использования коробок"},{to:x.statsDataExport,icon:D,title:"Экспорт данных",description:"Экспорт аналитики и списков"},{to:x.statsUsers,icon:w,iconSize:45,title:"Аналитика пользователей",description:"Обзор ключевых пользовательских данных"}],$=[{title:"Принято заявок",value:12,largeValueSize:!0},{title:"В работе",value:6,largeValueSize:!0},{title:"Обработано заявок",value:3,largeValueSize:!0}],R=[{title:"Принято заявок",value:100,largeValueSize:!0},{title:"В работе",value:10,largeValueSize:!0},{title:"Обработано заявок",value:25,largeValueSize:!0}],U=[{name:"Иванов Илья",grade:1,isActive:!0,email:"mailto:example@example.com",phone:"tel:+79991234567"},{name:"Огурцов Никита",grade:2,isActive:!1,email:"mailto:cucumber@example.com",phone:"tel:+79998765432"},{name:"Пупыркина Светлана",grade:3,isActive:!0,email:"mailto:pup@example.com",phone:"tel:+79997654321"}],F=()=>{const t=k(),[a,s]=r.useState("day"),{isOpen:o,open:i,close:l}=B(),c=n=>{s(n==="left"?"day":"week")},m=n=>{console.log(n),l()},p=a==="day"?$:R;return e.jsxs("div",{className:"flex flex-col gap-[20px]",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-[20px]",children:[e.jsx(h,{icon:"box",onClick:()=>i(),className:"max-[1070px]:px-[10px]",children:e.jsx("span",{className:"text-left max-[1140px]:text-xs",children:"Создать коробку"})}),e.jsx(h,{icon:"special_projects",smallIcon:!0,className:"max-[1070px]:px-[10px]",children:e.jsx("span",{className:"text-left max-[1140px]:text-xs",children:"Создать спецпроект"})}),e.jsx(h,{icon:"users",onClick:()=>t(x.employeesCreate),className:"max-[1070px]:px-[10px]",children:e.jsx("span",{className:"text-left max-[1140px]:text-xs",children:"Добавить пользователя"})}),Z.map(n=>e.jsx(_,{...n},n.to))]}),e.jsxs("div",{className:"flex gap-[20px]",children:[e.jsxs(g,{className:"flex flex-col gap-[40px] p-[20px] pb-[32px] flex-1",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h4",{className:"text-h4sb text-black-dark",children:"Сводка"}),e.jsx(N,{leftLabel:"День",rightLabel:"Неделя",onToggle:c,className:"w-[229px]"})]}),e.jsx(A,{cards:p,className:"min-h-[176px]"})]}),e.jsxs(g,{className:"flex flex-col gap-[12px] p-[20px] max-h-[314px] max-w-[500px] w-full",children:[e.jsx("h4",{className:"text-h4sb text-black-dark",children:"Команда дня"}),e.jsx("ul",{className:"flex flex-col gap-[16px] pr-[20px] overflow-y-auto",children:U.map((n,d)=>e.jsx("li",{children:e.jsx(z,{...n})},d))})]})]}),o&&e.jsx(y,{isOpen:o,onClose:l,onSave:m})]})},ie=F;export{ie as Component};
