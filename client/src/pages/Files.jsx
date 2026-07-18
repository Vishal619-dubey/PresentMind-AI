import React from "react";
import { useEffect,useState } from "react";
import { Download, Trash2 } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";
export default function Files(){
 const [files,setFiles]=useState([]);const load=()=>api.get("/files").then(r=>setFiles(r.data));useEffect(load,[]);
 const del=async id=>{await api.delete(`/files/${id}`);toast.success("Deleted");load()};
 return <section className="page"><div className="page-title"><div><h1>My Files</h1><p>Generated presentations, converted documents and saved outputs.</p></div></div>
 <div className="files-table"><div className="table-head"><span>Name</span><span>Type</span><span>Created</span><span>Size</span><span>Actions</span></div>
 {files.length?files.map(f=><div className="table-row" key={f.id}><b>{f.name}</b><span>{f.type}</span><span>{new Date(f.createdAt).toLocaleString()}</span><span>{f.sizeLabel}</span><span><button onClick={()=>window.open(`${import.meta.env.VITE_API_URL||"http://localhost:5000/api"}/files/download/${f.id}`,"_blank")}><Download size={16}/></button><button onClick={()=>del(f.id)}><Trash2 size={16}/></button></span></div>):<div className="empty-state">No generated files yet.</div>}
 </div></section>
}
