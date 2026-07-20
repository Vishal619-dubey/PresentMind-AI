import React, { useEffect, useRef, useState } from "react";
import { Workflow, Copy, Download, ZoomIn, ZoomOut, RotateCcw, Maximize2, Code2, Eye, Loader2 } from "lucide-react";
import mermaid from "mermaid";
import api from "../services/api";
import toast from "react-hot-toast";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "base",
  themeVariables: {
    primaryColor: "#eef0ff",
    primaryTextColor: "#171a35",
    primaryBorderColor: "#6847ef",
    lineColor: "#6b7280",
    secondaryColor: "#edf8ff",
    tertiaryColor: "#f8f6ff",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "16px"
  },
  flowchart: { curve: "basis", htmlLabels: true, useMaxWidth: false, nodeSpacing: 55, rankSpacing: 70 }
});

const starterCode = `flowchart TD
  A([Start]) --> B[Enter Student Credentials]
  B --> C{Credentials Valid?}
  C -->|No| D[Show Login Error]
  D --> B
  C -->|Yes| E[Open Examination Dashboard]
  E --> F[Select Available Exam]
  F --> G[Load Questions]
  G --> H[Submit Answers]
  H --> I[Calculate Result]
  I --> J[(Save Result)]
  J --> K([End])`;

export default function Diagrams() {
  const [prompt, setPrompt] = useState("Create a complete flowchart for an online examination system");
  const [type, setType] = useState("Flowchart");
  const [result, setResult] = useState(starterCode);
  const [svg, setSvg] = useState("");
  const [loading, setLoading] = useState(false);
  const [renderError, setRenderError] = useState("");
  const [zoom, setZoom] = useState(1);
  const [tab, setTab] = useState("preview");
  const [fullscreen, setFullscreen] = useState(false);
  const renderId = useRef(0);

  useEffect(() => { renderDiagram(result); }, [result]);

  async function renderDiagram(code) {
    if (!code?.trim()) return;
    try {
      setRenderError("");
      renderId.current += 1;
      const { svg: renderedSvg } = await mermaid.render(`presentmind-diagram-${renderId.current}`, code);
      setSvg(renderedSvg);
    } catch (error) {
      console.error(error);
      setSvg("");
      setRenderError("Diagram syntax render nahi ho paayi. Code tab me syntax check karo.");
    }
  }

  async function generateDiagram() {
    if (!prompt.trim()) return toast.error("Diagram prompt enter karo");
    setLoading(true);
    try {
      const { data } = await api.post("/diagrams/generate", { prompt, type });
      setResult(data.mermaid);
      setTab("preview");
      setZoom(1);
      toast.success("Visual diagram generated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Diagram generate nahi hua");
    } finally { setLoading(false); }
  }

  function downloadSvg() {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toLowerCase().replace(/\s+/g, "-")}-diagram.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadPng() {
    if (!svg) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");
    const svgElement = doc.documentElement;
    const viewBox = svgElement.getAttribute("viewBox")?.split(" ").map(Number);
    const width = Math.max(1400, viewBox?.[2] || 1400);
    const height = Math.max(800, viewBox?.[3] || 800);
    svgElement.setAttribute("width", String(width));
    svgElement.setAttribute("height", String(height));
    const serialized = new XMLSerializer().serializeToString(svgElement);
    const image = new Image();
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;
      canvas.height = height * 2;
      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      canvas.toBlob((pngBlob) => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${type.toLowerCase().replace(/\s+/g, "-")}-diagram.png`;
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    image.src = url;
  }

  return (
    <section className="page diagram-page">
      <div className="page-title"><div><h1>Diagram Studio</h1><p>Generate real visual flowcharts, architectures, timelines, DFDs and ER diagrams.</p></div></div>
      <div className="diagram-workspace">
        <aside className="diagram-controls form-card">
          <div className="diagram-control-title"><Workflow size={21}/><div><strong>Diagram Details</strong><span>Prompt aur diagram type select karo</span></div></div>
          <label>Diagram Prompt<textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} /></label>
          <label>Diagram Type<select value={type} onChange={(e)=>setType(e.target.value)}><option>Flowchart</option><option>Architecture</option><option>DFD</option><option>Timeline</option><option>ER Diagram</option></select></label>
          <button className="primary-action diagram-generate" onClick={generateDiagram} disabled={loading}>{loading?<Loader2 className="spin" size={18}/>:<Workflow size={18}/>} {loading?"Generating...":"Generate Visual Diagram"}</button>
          <div className="diagram-hint"><b>Better prompt example</b><p>Create an online examination flowchart including login, validation, exam selection, submission, result calculation and database storage.</p></div>
        </aside>
        <div className={`diagram-studio-card ${fullscreen?"is-fullscreen":""}`}>
          <div className="diagram-studio-toolbar">
            <div className="diagram-tabs">
              <button className={tab==="preview"?"active":""} onClick={()=>setTab("preview")}><Eye size={16}/> Visual Preview</button>
              <button className={tab==="code"?"active":""} onClick={()=>setTab("code")}><Code2 size={16}/> Mermaid Code</button>
            </div>
            <div className="diagram-tools">{tab==="preview"&&<><button onClick={()=>setZoom(v=>Math.max(.5,v-.1))}><ZoomOut size={17}/></button><span>{Math.round(zoom*100)}%</span><button onClick={()=>setZoom(v=>Math.min(2,v+.1))}><ZoomIn size={17}/></button><button onClick={()=>setZoom(1)}><RotateCcw size={17}/></button><button onClick={()=>setFullscreen(v=>!v)}><Maximize2 size={17}/></button></>}</div>
          </div>
          {tab==="preview"?(
            <div className="diagram-canvas">{renderError?<div className="diagram-render-error">{renderError}</div>:svg?<div className="diagram-svg-wrap" style={{transform:`scale(${zoom})`}} dangerouslySetInnerHTML={{__html:svg}}/>:<div className="diagram-empty"><Workflow size={48}/><h3>Diagram preview yahan show hoga</h3></div>}</div>
          ):(
            <div className="diagram-code-editor"><div className="diagram-code-head"><b>Editable Mermaid Code</b><button onClick={()=>{navigator.clipboard.writeText(result);toast.success("Code copied")}}><Copy size={15}/> Copy</button></div><textarea value={result} onChange={(e)=>setResult(e.target.value)} spellCheck="false"/><small>Code edit karte hi visual preview automatically update hoga.</small></div>
          )}
          <div className="diagram-export-bar"><div><strong>{type} Diagram</strong><span>High-quality SVG aur PNG export</span></div><button onClick={downloadSvg} disabled={!svg}><Download size={16}/> Download SVG</button><button className="export-primary" onClick={downloadPng} disabled={!svg}><Download size={16}/> Download PNG</button></div>
        </div>
      </div>
    </section>
  );
}
