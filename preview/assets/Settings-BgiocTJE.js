import{c as k,A as I,P as n,u as O,a as z,d as H,h as J,b as W,r as p,V as X,j as e,B as y,L as Y,M as j}from"./index-BO7s86UE.js";import{S as Z}from"./Switch-DB5eF_Nd.js";import{T as ee}from"./ToggleButton-CWofDZV2.js";const x={welcome_message:"welcome_message",record_confirmation:"record_confirmation",event_reminder_for_week:"event_reminder_for_week",event_reminder_for_24_hours:"event_reminder_for_24_hours",cancellation_message:"cancellation_message",thanks_message:"thanks_message",system_err_message:"system_err_message"},se=async({signal:t})=>{const a=(await k.get(I.settings.messages,{signal:t})).data;return[{id:0,value:a.welcome_message||""},{id:1,value:a.record_confirmation||""},{id:2,value:a.event_reminder_for_week||""},{id:3,value:a.event_reminder_for_24_hours||""},{id:4,value:a.cancellation_message||""},{id:5,value:a.thanks_message||""},{id:6,value:a.system_err_message||""}]},te=t=>{const o=S.reduce((a,c)=>{const l=t.find(m=>m.id===c.id);return a[c.serverName]=l?.value||"",a},{});return k.put(I.settings.messages,o)},h=[{id:0,name:"Администратор",description:"Высший уровень доступа",serverName:"admin"},{id:1,name:"Менеджер 1 звена",description:"Полный уровень доступа",serverName:"manager_1"},{id:2,name:"Менеджер 2 звена",description:"Средний уровень доступа",serverName:"manager_2"},{id:3,name:"Менеджер 3 звена",description:"Низкий уровень доступа",serverName:"manager_3"}],ae=[{id:0,name:"Заявки"},{id:1,name:"Коробки"},{id:2,name:"Презентации"},{id:3,name:"Спецпроекты"},{id:4,name:"Аналитика"},{id:5,name:"Другое"}],b=[{id:0,groupId:0,name:"Просмотр таблицы заявок",serverName:n.applicationsView},{id:1,groupId:0,name:"Редактирование таблицы заявок",serverName:n.applicationsEdit},{id:2,groupId:0,name:"Удаление таблицы заявок",serverName:n.applicationsDelete},{id:3,groupId:1,name:"Создание коробок",serverName:n.boxesCreate},{id:4,groupId:1,name:"Редактирование коробок",serverName:n.boxesEdit},{id:5,groupId:1,name:"Удаление коробок",serverName:n.boxesDelete},{id:6,groupId:2,name:"Просмотр презентаций",serverName:n.presentationsView},{id:7,groupId:2,name:"Редактирование презентаций",serverName:n.presentationsEdit},{id:8,groupId:2,name:"Удаление презентаций",serverName:n.presentationsDelete},{id:9,groupId:3,name:"Просмотр спецпроектов",serverName:n.specprojectsView},{id:10,groupId:3,name:"Редактирование спецпроектов",serverName:n.specprojectsEdit},{id:11,groupId:3,name:"Удаление спецпроектов",serverName:n.specprojectsDelete},{id:12,groupId:4,name:"Просмотр",serverName:n.analyticsView},{id:13,groupId:4,name:"Скачивание",serverName:n.analyticsDownload},{id:14,groupId:5,name:"Афиша",serverName:n.affiche},{id:15,groupId:5,name:"Раздел о нас",serverName:n.about},{id:16,groupId:5,name:"FAQ",serverName:n.faq}],S=[{id:0,name:"Поле для приветствия",serverName:x.welcome_message},{id:1,name:"Текст для подтверждения записи",serverName:x.record_confirmation},{id:2,name:"Напоминание №1 о мероприятии (за 1 неделю)",serverName:x.event_reminder_for_week},{id:3,name:"Напоминание №2 о мероприятии (за 24 часа)",serverName:x.event_reminder_for_24_hours},{id:4,name:"Текст сообщения при отмене бронирования",serverName:x.cancellation_message},{id:5,name:"Благодарность по завершению мероприятия",serverName:x.thanks_message},{id:6,name:"Текст системной ошибки",serverName:x.system_err_message}],re=()=>{const{showNotification:t}=O(),o=z(),a=H(),c=["messages"],l=J({queryKey:c,queryFn:se,placeholderData:d=>d}),m=W({mutationFn:d=>te(d),onSuccess:()=>{a.invalidateQueries({queryKey:c}),t({status:"success",message:"Успешно сохранено"})},onError:d=>o(d)});return{messages:l.data,isLoadingMessages:l.isPending,isFetchingMessages:l.isFetching,updateMessages:m.mutate,isUpdatingMessages:m.isPending}},ne=()=>{const[t,o]=p.useState("roleSelection"),[a,c]=p.useState(0),[l,m]=p.useState({}),d=p.useRef({}),{messages:v,updateMessages:E,isLoadingMessages:F,isFetchingMessages:M,isUpdatingMessages:A}=re(),f=h.find(s=>s.id===a)?.serverName,{accessSettings:N,updateAccessSettings:V,isLoadingAccessSettings:C,isFetchingAccessSettings:g,isUpdatingAccessSettings:L}=X(f),w=F||M||A||C||g||L,R=s=>{s==="left"&&t!=="textsSetup"||o(s==="left"?"roleSelection":"textsSetup")},T=s=>{c(s),o("accessSetupLoading")},D=()=>{o("roleSelection")},q=()=>{const s=S.map(r=>({id:r.id,value:d.current[r.id]?.value||""}));E(s)},P=()=>{v&&v.forEach(s=>{const r=d.current[s.id];r&&(r.value=s.value)})},Q=s=>{if(!f)return;const r=b.filter(i=>!!s[i.id]).map(i=>i.serverName);V({data:r,roleServerId:f})},U=()=>{t==="textsSetup"?q():Q(l)},B=()=>{t==="textsSetup"?P():_()},_=p.useCallback(()=>{const s={};b.forEach(r=>{const i=N?N.includes(r.serverName):!1;s[r.id]=i}),m(s)},[N]),K=(s,r)=>{m(i=>({...i,[s]:r}))};return p.useEffect(()=>{t==="accessSetupLoading"&&!g&&(_(),setTimeout(()=>{o("accessSetup")},0))},[g,t,_]),e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"bg-white text-text-black-dark text-h2 p-[18px_20px] rounded-[8px]",children:"Системные настройки"}),e.jsxs("div",{className:`
          ${t!=="accessSetup"?"bg-white":""}
          rounded-[8px]
          h-full
          mt-[20px]
          flex-1
          text-text
        `,children:[e.jsxs("div",{className:`
            flex
            flex-wrap
            min-h-[46px]
            gap-[20px]
            justify-between
            ${t!=="accessSetup"&&"m-[20px]"}
          `,children:[e.jsx(ee,{className:"w-[562px]! mr-[20px] min-w-[488px]",leftLabel:"Настройка уровня доступа",rightLabel:"Настройка текстов",onToggle:R}),!(t==="roleSelection"||t==="accessSetupLoading")&&e.jsxs("div",{children:[e.jsx(y,{label:"Отменить",variant:"secondary",onClick:B,className:"w-[168px] mr-[20px] min-h-[46px]",disabled:w}),e.jsx(y,{label:"Сохранить",onClick:U,className:"w-[168px] min-h-[46px]",disabled:w})]})]}),(t==="roleSelection"||t==="accessSetupLoading")&&e.jsx("div",{className:"mt-[32px]",children:h.map((s,r)=>e.jsxs("button",{type:"button",className:`
                  h-[101px]
                  w-[calc(100%-20px*2)]
                  flex
                  p-[20px]
                  m-[20px]
                  border-1
                  border-yellow-accent-light
                  rounded-[8px]
                  justify-between
                  items-center
                  hover:border-yellow-light
                  active:border-yellow-accent-dark
                  cursor-pointer
                  relative
                `,onClick:()=>T(s.id),children:[e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("span",{className:"text-h3 text-text mt-[-3px]",children:s.name}),e.jsx("span",{className:"text-h4sb text-text-grey-dark mt-[-3px]",children:s.description})]}),g&&a===s.id&&e.jsx(Y,{className:"absolute inset-0"}),e.jsx(j,{className:"w-[23px] text-text-grey-dark mr-[9px]"})]},r))}),t==="textsSetup"&&S.map((s,r)=>e.jsxs("div",{className:"flex flex-col m-[16px_20px]",children:[e.jsx("span",{className:"text-text-grey-dark text-xxs pb-[2px]",children:s.name}),e.jsx("style",{children:`
                  textarea::placeholder {
                    transition: color 0.3s ease-in-out;
                  }
                `}),e.jsx("textarea",{ref:i=>{d.current[s.id]=i},placeholder:"Место для текста",className:`
                  h-[60px]
                  resize-none
                  outline-0
                  border-1
                  border-grey-dark
                  text-text
                  text-h5
                  rounded-[8px]
                  p-[10px_12px]
                  transition-[border-color]
                  duration-300
                  ease-in-out
                  hover:border-grey-dark
                  active:border-grey-dark
                  placeholder-shown:border-grey-light
                  placeholder:italic
                  placeholder:text-small
                  placeholder:text-text-grey-light
                  placeholder:border-grey-light
                  hover:placeholder:text-text-grey-dark
                `,defaultValue:v?.find(i=>i.id===s.id)?.value||""})]},r)),t==="accessSetup"&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",className:`
                h-[101px]
                w-[100%]
                flex
                p-[20px]
                my-[20px_8px]
                border-1
                border-yellow-accent-light
                rounded-[8px]
                justify-between
                items-center
                hover:border-yellow-light
                active:border-yellow-accent-dark
                bg-white
                cursor-pointer
              `,onClick:D,children:[e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("span",{className:"text-h3 text-text mt-[-3px]",children:h.find(s=>s.id===a)?.name}),e.jsx("span",{className:"text-h4sb text-text-grey-dark mt-[-3px]",children:h.find(s=>s.id===a)?.description})]}),e.jsx(j,{className:"w-[23px] text-text-grey-dark mr-[9px] rotate-180"})]}),e.jsx("div",{className:"bg-white rounded-[8px] flex-1 p-[20px]",children:e.jsx("div",{className:"flex flex-col flex-wrap content-start [@media(min-width:1220px)]:max-h-[616px]",children:ae.map((s,r)=>{let i;switch(r){case 1:i="mb-[12px]";break;case 4:i="mb-[40px]";break;default:i="mb-[20px]"}return e.jsxs("div",{className:`${i} min-w-[462px] pl-[20px] `,children:[e.jsx("h5",{className:"text-h5 h-[40px] mb-[12px] flex items-center",children:s.name}),e.jsx("div",{className:"flex flex-col gap-[8px]",children:b.filter(u=>u.groupId===s.id).map((u,$)=>e.jsxs("div",{className:"h-[40px] ml-[40px] flex items-center gap-[12px]",children:[e.jsx(Z,{checked:l[u.id],onChange:G=>K(u.id,G),disabled:a===0,disabledColorful:a===0}),e.jsx("span",{className:"text-h5",children:u.name})]},$))})]},r)})})})]})]})]})},ce=ne;export{ce as Component};
