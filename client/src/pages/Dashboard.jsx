import React from "react";
import { useEffect, useState } from "react";
import { Presentation, FileInput, FileOutput, Lightbulb, FileText, Workflow, ArrowRight, Play, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import StatCard from "../components/StatCard";

const quick = [
  ["/create","Topic to PPT","AI-generated slides from any topic",Presentation,"violet"],
  ["/pdf-to-ppt","PDF to PPT","Convert PDFs into editable slides",FileInput,"red"],
  ["/ppt-to-pdf","PPT to PDF","Export presentations to PDF",FileOutput,"orange"],
  ["/research","Research Ideas","Discover structured research ideas",Lightbulb,"blue"],
  ["/synopsis","Synopsis Builder","Generate structured synopsis fast",FileText,"green"],
  ["/diagrams","Diagram Generator","Create diagrams with AI",Workflow,"purple"]
];

export default function Dashboard(){
  const [files,setFiles]=useState([]);
  useEffect(()=>{api.get("/files").then(({data})=>setFiles(data.slice(0,5))).catch(()=>{})},[]);
  return <section className="dashboard">
    <div className="top-grid">
      <div className="generator-hero">
        <div className="hero-title"><div className="magic">🪄</div><h1>Turn any <span>idea</span> into a<br/>structured presentation</h1></div>
        <div className="generator-form">
          <label>Topic<input placeholder="Enter your presentation topic..."/></label>
          <label>Slides<select><option>12</option><option>8</option><option>15</option></select></label>
          <label>Audience<select><option>Professionals</option><option>College</option><option>School</option></select></label>
          <label>Language<select><option>English</option><option>Hindi</option></select></label>
          <label>Style<select><option>Modern</option><option>Academic</option><option>Minimal</option></select></label>
        </div>
        <Link className="generate-main" to="/create">✦ Generate Presentation</Link>
      </div>
      <div className="preview-panel">
        <div className="panel-head"><b>Live Presentation Preview</b><button>View All <ArrowRight size={15}/></button></div>
        <div className="preview-body">
          <div className="thumbs">{[1,2,3,4,5].map((n)=><div className={n===1?"selected":""} key={n}><span>{n}</span><div className={`mini-slide s${n}`}></div></div>)}</div>
          <div className="main-slide">
            <span>01</span><h2>The Future of<br/>Artificial Intelligence</h2><p>Trends, Impact and Opportunities</p><small>Presented by<br/><b>Vishal Dubey</b></small>
            <div className="wave"></div>
          </div>
        </div>
        <div className="preview-actions"><span>‹</span><b>1 / 12</b><span>›</span><button><Pencil size={15}/> Edit in Studio</button><button className="present"><Play size={15}/> Present</button></div>
      </div>
    </div>

    <div className="quick-grid">{quick.map(([to,t,d,Icon,c])=><Link to={to} className="quick-card" key={t}><div className={`quick-icon ${c}`}><Icon size={22}/></div><b>{t}</b><p>{d}</p></Link>)}</div>

    <div className="bottom-grid">
      <div className="stats-stack">
        <StatCard icon="🖥️" label="Total Presentations" value="86" growth="18"/>
        <StatCard icon="📄" label="Converted Files" value="54" growth="21" color="red"/>
        <StatCard icon="💡" label="Research Ideas" value="132" growth="24" color="blue"/>
        <StatCard icon="📗" label="Saved Synopses" value="28" growth="16" color="green"/>
      </div>
      <div className="diagram-card">
        <div className="panel-head"><b>Diagram Studio</b><Link to="/diagrams">View All <ArrowRight size={15}/></Link></div>
        <div className="diagram-preview">
          <div className="flow-mini"><span>Start</span><i>↓</i><span className="decision">Decision</span><i>↓</i><span>Process</span><i>↓</i><span>End</span></div>
          <div className="arch-mini"><span>Client</span><i>↓</i><span>Web Layer</span><i>↓</i><span>App Layer</span><i>↓</i><span>Database</span></div>
          <div className="timeline-mini"><div></div><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
        </div>
        <div className="diagram-labels"><span><b>Flowchart</b><small>Process mapping</small></span><span><b>Architecture</b><small>System architecture</small></span><span><b>Timeline</b><small>Project timeline</small></span></div>
      </div>
      <div className="research-card">
        <div className="panel-head"><b>Research Assistant</b><Link to="/research">View All <ArrowRight size={15}/></Link></div>
        {[
          ["🎯","Research Gap","Limited multi-modal datasets for low-resource languages in NLP tasks."],
          ["✅","Objectives","To develop an efficient model using transfer learning."],
          ["🧪","Methodology","Data collection, preprocessing, fine-tuning and evaluation."],
          ["🚩","Expected Outcome","Improved model performance and dataset availability."]
        ].map(([i,t,d])=><div className="research-row" key={t}><div>{i}</div><span><b>{t}</b><p>{d}</p></span></div>)}
      </div>
      <div className="recent-card">
        <div className="panel-head"><b>Recent Files</b><Link to="/files">View All <ArrowRight size={15}/></Link></div>
        {(files.length?files:[
          {name:"AI in Healthcare.pptx",type:"Presentation",createdAt:"2026-07-18"},
          {name:"Research Paper.pdf",type:"PDF Document",createdAt:"2026-07-17"},
          {name:"Marketing Strategy.pptx",type:"Presentation",createdAt:"2026-07-16"},
          {name:"Synopsis - IoT Security.docx",type:"Synopsis Draft",createdAt:"2026-07-15"},
          {name:"Deep Learning Survey.pdf",type:"PDF Document",createdAt:"2026-07-14"}
        ]).map((f,i)=><div className="file-row" key={i}><div className={`file-icon f${i%3}`}>{f.name?.endsWith(".pdf")?"PDF":f.name?.endsWith(".docx")?"DOC":"PPT"}</div><span><b>{f.name}</b><small>{f.type} • {new Date(f.createdAt).toLocaleDateString()}</small></span><i>⋮</i></div>)}
        <Link className="more-files" to="/files">+ View all files</Link>
      </div>
    </div>
  </section>
}
