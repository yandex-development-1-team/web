const n=r=>new Promise((o,a)=>{const e=new FileReader;e.onloadend=()=>o(e.result),e.onerror=a,e.readAsDataURL(r)});export{n as f};
