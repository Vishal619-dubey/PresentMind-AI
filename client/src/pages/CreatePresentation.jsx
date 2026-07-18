import React from "react";
import { useState } from "react";
import { Download, Sparkles } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function CreatePresentation(){
  const [form,setForm]=useState({topic:"Artificial Intelligence in Healthcare",slides:12,audience:"College",language:"English",style:"Modern"});
  const [loading,setLoading]=useState(false);
  const [outline,setOutline]=useState([]);
  const generate=async()=>{
    setLoading(true);
    try{
      const {data}=await api.post("/presentations/generate",form);
      setOutline(data.outline||[]);
      toast.success("Presentation generated");
      window.open(`${import.meta.env.VITE_API_URL||"http://localhost:5000/api"}/files/download/${data.fileId}`,"_blank");
    }catch(e){toast.error(e.response?.data?.message||"Generation failed")}
    finally{setLoading(false)}
  };
  return <section className="page">
    <div className="page-title"><div><h1>Create Presentation</h1><p>Generate a structured, downloadable PPTX from any topic.</p></div></div>
    <div className="form-card">
      <label>Presentation Topic<textarea value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})}/></label>
      <div className="form-grid">
        <label>Slides<input type="number" min="5" max="30" value={form.slides} onChange={e=>setForm({...form,slides:Number(e.target.value)})}/></label>
        <label>Audience<select value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})}><option>College</option><option>Professionals</option><option>School</option><option>Researchers</option></select></label>
        <label>Language<select value={form.language} onChange={e=>setForm({...form,language:e.target.value})}><option>English</option><option>Hindi</option></select></label>
        <label>Style<select value={form.style} onChange={e=>setForm({...form,style:e.target.value})}><option>Modern</option><option>Academic</option><option>Minimal</option><option>Corporate</option></select></label>
      </div>
      <button className="primary-action" onClick={generate} disabled={loading}><Sparkles size={18}/>{loading?"Generating...":"Generate Presentation"}</button>
    </div>
    {outline.length>0&&<div className="output-card"><h3>Generated Outline</h3>{outline.map((x,i)=><div className="outline-row" key={i}><b>{i+1}</b><span><strong>{x.title}</strong><p>{x.summary}</p></span></div>)}</div>}
  </section>
}
