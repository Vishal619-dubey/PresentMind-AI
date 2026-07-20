import {Router} from "express";import path from "path";import fs from "fs";import {spawn} from "child_process";import {addFile} from "../fileStore.js";import {structuredAI,presentationFallback} from "../ai.js";
const router=Router();
router.post("/generate",async(req,res)=>{
 const {topic,slides=12,audience="College",language="English",style="Modern"}=req.body;
 if(!topic)return res.status(400).json({message:"Topic is required"});
 const fallback={outline:presentationFallback(topic,Number(slides))};
 const prompt=`Create JSON {"outline":[{"title":"","summary":"","bullets":["","",""]}]} for a ${slides}-slide ${style} presentation on "${topic}" for ${audience} in ${language}.`;
 const content=await structuredAI(prompt,fallback);
 const out=path.join(process.cwd(),"generated",`${Date.now()}-${topic.replace(/[^a-z0-9]+/gi,"-").slice(0,50)}.pptx`);
 const py=process.env.PYTHON_COMMAND||"python";
 const script=path.resolve(process.cwd(),"../python_engine/generate_ppt.py");
 const child=spawn(py,[script,JSON.stringify({topic,audience,language,style,outline:content.outline}),out]);
 let err="";child.stderr.on("data",d=>err+=d);
 child.on("close",code=>{
  if(code!==0)return res.status(500).json({message:"Presentation engine failed",details:err});
  const stat=fs.statSync(out);const f=addFile({name:path.basename(out),type:"Presentation",path:out,size:stat.size});
  res.json({fileId:f.id,outline:content.outline});
 });
});
export default router;
