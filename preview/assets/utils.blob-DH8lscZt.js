function l(n,c){const e=window.URL.createObjectURL(n),t=e.split("/").pop(),o=document.createElement("a");o.href=e,o.download=`${t}`,o.click(),window.URL.revokeObjectURL(e)}export{l as d};
