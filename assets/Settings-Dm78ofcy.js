import{r as u,j as e,a as g}from"./index-Bk1prijt.js";import{B as b}from"./ReactCrop-CfbtWZSI.js";import{S as E}from"./Switch-Be2N9BTz.js";import{T}from"./ToggleButton-DWRlrgUY.js";const x=[{id:0,name:"Администратор",description:"Высший уровень доступа"},{id:1,name:"Менеджер 1 звена",description:"Полный уровень доступа"},{id:2,name:"Менеджер 2 звена",description:"Средний уровень доступа"},{id:3,name:"Менеджер 3 звена",description:"Низкий уровень доступа"}],V=[{id:0,name:"Заявки"},{id:1,name:"Коробки"},{id:2,name:"Презентации"},{id:3,name:"Спецпроекты"},{id:4,name:"Аналитика"},{id:5,name:"Другое"}],p=[{id:0,groupId:0,name:"Просмотр таблицы заявок"},{id:1,groupId:0,name:"Редактирование таблицы заявок"},{id:2,groupId:0,name:"Удаление таблицы заявок"},{id:3,groupId:1,name:"Создание коробок"},{id:4,groupId:1,name:"Редактирование коробок"},{id:5,groupId:1,name:"Удаление коробок"},{id:6,groupId:2,name:"Просмотр презентаций"},{id:7,groupId:2,name:"Редактирование презентаций"},{id:8,groupId:2,name:"Удаление презентаций,"},{id:9,groupId:3,name:"Просмотр спецпроектов"},{id:10,groupId:3,name:"Редактирование спецпроектов"},{id:11,groupId:3,name:"Удаление спецпроектов,"},{id:12,groupId:4,name:"Просмотр"},{id:13,groupId:4,name:"Скачивание"},{id:14,groupId:5,name:"Афиша"},{id:15,groupId:5,name:"Раздел о нас"},{id:16,groupId:5,name:"FAQ"}],_=[{id:0,name:"Поле для приветствия"},{id:1,name:"Текст для подтверждения записи"},{id:2,name:"Напоминание №1 о мероприятии (за 1 неделю)"},{id:3,name:"Напоминание №2 о мероприятии (за 24 часа)"},{id:4,name:"Текст сообщения при отмене бронирования"},{id:5,name:"Благодарность по завершению мероприятия"},{id:6,name:"Текст системной ошибки"}],m=[{id:0,value:""},{id:1,value:""},{id:2,value:""},{id:3,value:""},{id:4,value:""},{id:5,value:""},{id:6,value:""}],j=[{accountId:0,accessRights:[{id:0,value:!0},{id:1,value:!0},{id:2,value:!0},{id:3,value:!0},{id:4,value:!0},{id:5,value:!0},{id:6,value:!0},{id:7,value:!0},{id:8,value:!0},{id:9,value:!0},{id:10,value:!0},{id:11,value:!0},{id:12,value:!0},{id:13,value:!0},{id:14,value:!0},{id:15,value:!0},{id:16,value:!0}]},{accountId:1,accessRights:[{id:0,value:!0},{id:1,value:!0},{id:2,value:!1},{id:3,value:!0},{id:4,value:!0},{id:5,value:!1},{id:6,value:!0},{id:7,value:!0},{id:8,value:!1},{id:9,value:!0},{id:10,value:!0},{id:11,value:!1},{id:12,value:!0},{id:13,value:!1},{id:14,value:!0},{id:15,value:!0},{id:16,value:!0}]},{accountId:2,accessRights:[{id:0,value:!0},{id:1,value:!0},{id:2,value:!1},{id:3,value:!0},{id:4,value:!0},{id:5,value:!1},{id:6,value:!0},{id:7,value:!0},{id:8,value:!1},{id:9,value:!0},{id:10,value:!0},{id:11,value:!1},{id:12,value:!1},{id:13,value:!1},{id:14,value:!0},{id:15,value:!1},{id:16,value:!0}]},{accountId:3,accessRights:[{id:0,value:!0},{id:1,value:!1},{id:2,value:!1},{id:3,value:!0},{id:4,value:!1},{id:5,value:!1},{id:6,value:!0},{id:7,value:!1},{id:8,value:!1},{id:9,value:!0},{id:10,value:!1},{id:11,value:!1},{id:12,value:!1},{id:13,value:!1},{id:14,value:!1},{id:15,value:!1},{id:16,value:!1}]}],B=()=>{const[i,c]=u.useState("roleSelection"),[r,w]=u.useState(0),[v,h]=u.useState([]),n=u.useRef([]),S=a=>{a==="left"&&i!=="textsSetup"||c(a==="left"?"roleSelection":"textsSetup")},y=a=>{w(a),f(a),c("accessSetup")},N=()=>{c("roleSelection")},I=()=>{const a=n.current.map(t=>t.value||"");m.forEach(t=>{a[t.id]?t.value=a[t.id]:t.value=""})},k=()=>{n.current.forEach((a,t)=>{const l=m.find(s=>s.id===t)?.value;l?a.value=l:a.value=""})},R=(a,t)=>{j.find(l=>l.accountId===a)?.accessRights.forEach(l=>{t[l.id]===!0||t[l.id]===!1?l.value=t[l.id]:l.value=!1})},A=()=>{i==="textsSetup"?I():R(r,v)},F=()=>{i==="textsSetup"?k():f(r)},f=a=>{const t=new Array(p.length).fill(!1);p.forEach(l=>{const s=l.id,o=j.find(d=>d.accountId===a)?.accessRights.find(d=>d.id===s)?.value;t[s]=o}),h(t)},C=(a,t)=>{h(l=>[...l.slice(0,a),t,...l.slice(a+1)])};return e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"bg-white text-text-black-dark text-h2 p-[18px_20px] rounded-[8px]",children:"Системные настройки"}),e.jsxs("div",{className:`
          ${i!=="accessSetup"?"bg-white":""}
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
            ${i!=="accessSetup"&&"m-[20px]"}
          `,children:[e.jsx(T,{className:"w-[562px]! mr-[20px] min-w-[488px]",leftLabel:"Настройка уровня доступа",rightLabel:"Настройка текстов",onToggle:S}),i!=="roleSelection"&&e.jsxs("div",{children:[e.jsx(b,{label:"Отменить",variant:"secondary",onClick:F,className:"w-[168px] mr-[20px] min-h-[46px]"}),e.jsx(b,{label:"Сохранить",onClick:A,className:"w-[168px] min-h-[46px]"})]})]}),i==="roleSelection"&&e.jsx("div",{className:"mt-[32px]",children:x.map((a,t)=>e.jsxs("button",{type:"button",className:`
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
                `,onClick:()=>y(a.id),children:[e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("span",{className:"text-h3 text-text mt-[-3px]",children:a.name}),e.jsx("span",{className:"text-h4sb text-text-grey-dark mt-[-3px]",children:a.description})]}),e.jsx(g,{className:"w-[23px] text-text-grey-dark mr-[9px]"})]},t))}),i==="textsSetup"&&_.map((a,t)=>e.jsxs("div",{className:"flex flex-col m-[16px_20px]",children:[e.jsx("span",{className:"text-text-grey-dark text-xxs pb-[2px]",children:a.name}),e.jsx("style",{children:`
                  textarea::placeholder {
                    transition: color 0.3s ease-in-out;
                  }
                `}),e.jsx("textarea",{ref:l=>{n.current[a.id]=l},placeholder:"Место для текста",className:`
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
                `,defaultValue:m.find(l=>l.id===t)?.value})]},t)),i==="accessSetup"&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",className:`
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
              `,onClick:N,children:[e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("span",{className:"text-h3 text-text mt-[-3px]",children:x.find(a=>a.id===r)?.name}),e.jsx("span",{className:"text-h4sb text-text-grey-dark mt-[-3px]",children:x.find(a=>a.id===r)?.description})]}),e.jsx(g,{className:"w-[23px] text-text-grey-dark mr-[9px] rotate-180"})]}),e.jsx("div",{className:"bg-white rounded-[8px] flex-1 p-[20px]",children:e.jsx("div",{className:"flex flex-col flex-wrap content-start [@media(min-width:1220px)]:max-h-[616px]",children:V.map((a,t)=>{let l;switch(t){case 1:l="mb-[12px]";break;case 4:l="mb-[40px]";break;default:l="mb-[20px]"}return e.jsxs("div",{className:`${l} min-w-[462px] pl-[20px] `,children:[e.jsx("h5",{className:"text-h5 h-[40px] mb-[12px] flex items-center",children:a.name}),e.jsx("div",{className:"flex flex-col gap-[8px]",children:p.filter(s=>s.groupId===a.id).map((s,o)=>e.jsxs("div",{className:"h-[40px] ml-[40px] flex items-center gap-[12px]",children:[e.jsx(E,{checked:v[s.id],onChange:d=>C(s.id,d)}),e.jsx("span",{className:"text-h5",children:s.name})]},o))})]},t)})})})]})]})]})},D=B;export{D as Component};
