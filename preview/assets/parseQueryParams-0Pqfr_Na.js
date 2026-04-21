const t=(e,r)=>{const a=Object.fromEntries(e.entries()),s=r.safeParse(a);return s.success?s.data:r.parse({})};export{t as p};
