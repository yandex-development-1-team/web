import{r as l,j as e,d as f,L as w,R as p,m as k,n as y,o as N,b as C}from"./index-BW-558P7.js";import{B as g}from"./ImageCropper-BhXvHlac.js";import{C as v}from"./Card-bK5Jc8k4.js";import{T as S}from"./ToggleButton-B9yi7yhx.js";import{B as M}from"./BoxSolutionModal-BjHEiVuX.js";import{S as E}from"./SpecialProjectModal-BqdC-2FW.js";import{S as L}from"./Edit-EXTa8Wjh.js";import{S as B}from"./Phone-CpHtEazh.js";import{P,a as O,b as T}from"./CalendarInput-C0nB_CG5.js";import{u as b}from"./useModal-BQ6CRIAZ.js";import"./Check-DmhBZ0F6.js";import"./Close-DIeKS0Zs.js";import"./Input-D5PLex1X.js";import"./Modal-CE7SYmIm.js";import"./Switch-BbY0Z77M.js";import"./TimeRangeInput-CR4sJSb_.js";import"./zod-l5JYY0QV.js";import"./index.esm-CTX_m_Lt.js";import"./schemas-Cv1PhS9i.js";import"./external-B55ZEAsJ.js";import"./v4-EwEgHOG0.js";import"./Select-C5jzsu9C.js";const D=({title:t,titleId:a,...s})=>l.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":a,...s},t?l.createElement("title",{id:a},t):null,l.createElement("path",{fill:"currentColor",d:"M7.403 27.957a3.439 3.439 0 0 1-3.334-3.64c-.016-2.87 0-5.741 0-8.612a.667.667 0 1 1 1.334 0c0 2.934-.043 5.867 0 8.8.021 1.476 1.13 2.119 2.45 2.119h16.618a2.066 2.066 0 0 0 1.962-1.29c.129-.46.174-.94.134-1.415v-8.214a.666.666 0 1 1 1.333 0c0 2.966.113 5.954 0 8.916a3.421 3.421 0 0 1-3.56 3.334l-16.937.002Z"}),l.createElement("path",{fill:"currentColor",d:"M16.45 4.235a.613.613 0 0 0-.415-.184.13.13 0 0 1-.058-.008c-.029-.011-.036 0-.054.008a.613.613 0 0 0-.416.184l-4.892 4.892a.667.667 0 0 0 .942.942l3.755-3.753v14.323a.667.667 0 1 0 1.333 0V6.316l3.755 3.753a.667.667 0 0 0 .943-.942l-4.894-4.892Z"})),V=({title:t,titleId:a,...s})=>l.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"none","aria-labelledby":a,...s},t?l.createElement("title",{id:a},t):null,l.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:1.5,d:"M4 25.273v-1.091a7.636 7.636 0 1 1 15.273 0v1.09"}),l.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:1.5,d:"M17.09 18.727a5.455 5.455 0 0 1 10.91 0v.546"}),l.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M11.636 16.546a4.364 4.364 0 1 0 0-8.728 4.364 4.364 0 0 0 0 8.728Zm10.91-3.273a3.273 3.273 0 1 0 0-6.546 3.273 3.273 0 0 0 0 6.546Z"})),A=({title:t,titleId:a,...s})=>l.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20","aria-labelledby":a,...s},t?l.createElement("title",{id:a},t):null,l.createElement("path",{stroke:"#4b5974",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M10.001 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666"}),l.createElement("path",{stroke:"#4b5974",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10.001 5a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666m0 11.667a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667"})),W=({data:t,className:a,...s})=>{const{title:o,value:n,warningColor:r,largeValueSize:c}=t;return e.jsxs("div",{className:f("flex flex-col gap-2 text-text w-full min-w-30",a),...s,children:[e.jsx("p",{className:"text-xxs",children:o}),e.jsx("div",{className:f("flex justify-center items-center","border border-grey-light rounded-lg","bg-white h-full"),children:e.jsx("span",{className:`${c?"text-indicator":"text-indicator-st"} 
          ${r?"text-red-dark":"text-text"}`,children:n})})]})},_=({cards:t,className:a,...s})=>e.jsx("div",{className:f("flex gap-5",a),...s,children:t.map((o,n)=>e.jsx(W,{data:o},n))}),z=`
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
`,R=`
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
`,Z=({to:t,icon:a,title:s,description:o,detailsLabel:n="Подробнее",iconSize:r})=>e.jsx(w,{to:t,children:e.jsxs("article",{className:z,style:{paddingTop:r?Math.round(-.615*r+40):20},children:[e.jsxs("div",{className:"flex flex-col",style:{gap:r?Math.round(-.615*r+40):20},children:[e.jsx(a,{className:"text-grey-dark",width:r??32,height:r??32,style:{marginLeft:r?Math.round(-.769*r+24.615):0}}),e.jsxs("div",{className:"flex flex-col gap-[10px]",children:[e.jsx("h4",{className:"text-h4sb text-black-dark",children:s}),e.jsx("p",{className:"text-h5",children:o})]})]}),e.jsx("div",{className:R,children:n})]})}),$=({name:t,grade:a,isActive:s,email:o,phone:n})=>{const[r,c]=l.useState(!1),d=[{link:o,action:"Написать",Icon:L,iconClassName:"w-[16px]"},{link:n,action:"Позвонить",Icon:B,iconClassName:"w-[32px] -mr-[6px]"}];return e.jsxs("div",{className:"flex items-start justify-between pb-[9px] border-b border-grey-light",children:[e.jsxs("div",{className:"flex gap-[9px]",children:[e.jsx("div",{className:`${s?"bg-yellow-accent-dark":"bg-grey-extra-light"} h-[14px] w-[14px] rounded-full mt-[4px] ml-[4px]`}),e.jsxs("div",{className:"flex flex-col gap-[4px]",children:[e.jsx("span",{className:"text-xs",children:t}),e.jsx("span",{className:"text-xxs",children:`Менеджер ${a} звена`})]})]}),e.jsxs(P,{open:r,onOpenChange:c,children:[e.jsx(O,{children:e.jsx(A,{width:20,className:"cursor-pointer",onClick:()=>c(!0)})}),e.jsx(T,{className:"w-[144px] bg-white border border-grey-light px-[12px] py-[10px] z-100 rounded-[8px] shadow-(--popover-shadow)",align:"end",onOpenAutoFocus:x=>x.preventDefault(),children:e.jsx("ul",{className:"flex flex-col gap-[10px]",children:d.map(({link:x,action:m,Icon:h,iconClassName:u})=>e.jsx("li",{children:e.jsxs("a",{href:x,className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-xs text-text",children:m}),e.jsx(h,{color:"var(--color-grey-dark)",className:u})]})}))})})]})]})},U=[{to:p.statsAttendance,icon:V,title:"Средняя посещаемость на коробку",description:"Статистика за выбранный период"},{to:p.statsApplications,icon:k,iconSize:45,title:"Работа с заявками",description:"Модерация заявок"},{to:p.statsPopularity,icon:y,iconSize:45,title:"Популярность коробочных решений",description:"Рейтинг использования коробок"},{to:p.statsDataExport,icon:D,title:"Экспорт данных",description:"Экспорт аналитики и списков"},{to:p.statsUsers,icon:N,iconSize:45,title:"Аналитика пользователей",description:"Обзор ключевых пользовательских данных"}],F=[{title:"Принято заявок",value:12,largeValueSize:!0},{title:"В работе",value:6,largeValueSize:!0},{title:"Обработано заявок",value:3,largeValueSize:!0}],G=[{title:"Принято заявок",value:100,largeValueSize:!0},{title:"В работе",value:10,largeValueSize:!0},{title:"Обработано заявок",value:25,largeValueSize:!0}],q=[{name:"Иванов Илья",grade:1,isActive:!0,email:"mailto:example@example.com",phone:"tel:+79991234567"},{name:"Огурцов Никита",grade:2,isActive:!1,email:"mailto:cucumber@example.com",phone:"tel:+79998765432"},{name:"Пупыркина Светлана",grade:3,isActive:!0,email:"mailto:pup@example.com",phone:"tel:+79997654321"}],H=()=>{const t=C(),[a,s]=l.useState("day"),{isOpen:o,open:n,close:r}=b(),{isOpen:c,open:d,close:x}=b(),m=i=>{s(i==="left"?"day":"week")},h=i=>{r()},u=a==="day"?F:G;return e.jsxs("div",{className:"flex flex-col gap-[20px]",children:[e.jsxs("div",{className:"grid grid-cols-1 min-[1110px]:grid-cols-3 gap-[20px]",children:[e.jsx(g,{icon:"box",onClick:()=>n(),children:e.jsx("span",{className:"text-left",children:"Создать коробку"})}),e.jsx(g,{icon:"special_projects",smallIcon:!0,onClick:()=>d(),children:e.jsx("span",{className:"text-left",children:"Создать спецпроект"})}),e.jsx(g,{icon:"users",onClick:()=>t(p.employeesCreate),children:e.jsx("span",{className:"text-left",children:"Добавить пользователя"})})]}),e.jsx("div",{className:"grid grid-cols-3 gap-[20px] max-[1250px]:grid-cols-2",children:U.map(i=>e.jsx(Z,{...i},i.to))}),e.jsxs("div",{className:"flex gap-[20px] max-[1180px]:flex-col",children:[e.jsxs(v,{className:"flex flex-col gap-[40px] p-[20px] pb-[32px] flex-1",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h4",{className:"text-h4sb text-black-dark",children:"Сводка"}),e.jsx(S,{leftLabel:"День",rightLabel:"Неделя",onToggle:m,className:"w-[229px]"})]}),e.jsx(_,{cards:u,className:"min-h-[176px]"})]}),e.jsxs(v,{className:"flex flex-col gap-[12px] p-[20px] max-h-[314px] w-full",children:[e.jsx("h4",{className:"text-h4sb text-black-dark",children:"Команда дня"}),e.jsx("ul",{className:"flex flex-col gap-[16px] pr-[20px] overflow-y-auto",children:q.map((i,j)=>e.jsx("li",{children:e.jsx($,{...i})},j))})]})]}),o&&e.jsx(M,{isOpen:o,onClose:r,onSave:h}),e.jsx(E,{isOpen:c,onClose:x,onSubmit:x,modalTitle:"Создать спецпроект"})]})},ge=H;export{ge as Component};
