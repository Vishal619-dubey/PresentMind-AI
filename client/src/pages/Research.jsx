import React from "react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";
export default function Research(){
  const [field,setField]=useState("Artificial Intelligence"),[goal,setGoal]=useState("MCA research paper"),[data,setData]=useState(null),[loading,setLoading]=useState(false);
  const run=async()=>{setLoading(true);try{const r=await api.post("/research/generate",{field,goal});setData(r.data);toast.success("Research plan generated")}catch(e){toast.error("Generation failed")}finally{setLoading(false)}};
  return <section className="page"><div className="page-title"><div><h1>Research Assistant</h1><p>Discover meaningful research ideas, gaps and methodologies.</p></div></div>
    <div className="form-card"><div className="form-grid two"><label>Research Field<input value={field} onChange={e=>setField(e.target.value)}/></label><label>Goal<input value={goal} onChange={e=>setGoal(e.target.value)}/></label></div><button className="primary-action" onClick={run}><Sparkles size={18}/>{loading?"Analyzing...":"Generate Research Plan"}</button></div>
    {data&&<div className="research-output"><h2>{data.title}</h2>{Object.entries(data).filter(([k])=>k!=="title").map(([k,v])=><div key={k}><h3>{k.replace(/([A-Z])/g," $1")}</h3>{Array.isArray(v)?<ul>{v.map(x=><li key={x}>{x}</li>)}</ul>:<p>{v}</p>}</div>)}</div>}
  </section>
}
