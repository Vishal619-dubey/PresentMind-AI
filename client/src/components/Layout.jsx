import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home, Presentation, FileInput, FileOutput, Search, FileText, Workflow,
  FolderOpen, LayoutTemplate, Settings, Bell, Plus, ChevronDown, Crown
} from "lucide-react";

const links = [
  ["/","Dashboard",Home],
  ["/create","Create Presentation",Presentation],
  ["/pdf-to-ppt","PDF to PPT",FileInput],
  ["/ppt-to-pdf","PPT to PDF",FileOutput],
  ["/research","Research Assistant",Search],
  ["/synopsis","Synopsis Generator",FileText],
  ["/diagrams","Diagram Studio",Workflow],
  ["/files","My Files",FolderOpen],
  ["/templates","Templates",LayoutTemplate],
  ["/settings","Settings",Settings]
];

export default function Layout(){
  const navigate = useNavigate();
  return <div className="shell">
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo-mark">P</div>
        <div><div className="logo-text">PresentMind AI</div><small>Intelligent Presentation &<br/>Research Workspace</small></div>
      </div>
      <nav>{links.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>isActive?"active":""}><Icon size={19}/><span>{label}</span></NavLink>)}</nav>
      <div className="upgrade-card">
        <div className="rocket">🚀</div>
        <h3>Upgrade to Pro</h3>
        <p>Unlock unlimited AI credits, premium templates and advanced tools.</p>
        <button>Upgrade Now</button>
      </div>
    </aside>
    <main className="workspace">
      <header className="topbar">
        <div className="global-search">⌕ <input placeholder="Search presentations, files, topics..."/><kbd>⌘ K</kbd></div>
        <button className="new-project" onClick={()=>navigate("/create")}><Plus size={18}/> New Project <ChevronDown size={16}/></button>
        <Bell size={21}/>
        <div className="profile">
          <div className="avatar">VD</div>
          <div><strong>Vishal Dubey</strong><span><Crown size={13}/> AI & Full-Stack Developer</span></div>
          <ChevronDown size={16}/>
        </div>
      </header>
      <Outlet/>
    </main>
  </div>
}
