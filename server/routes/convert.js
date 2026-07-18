import {Router} from "express";import multer from "multer";import path from "path";import fs from "fs";import {spawn} from "child_process";import {addFile} from "../fileStore.js";
const router=Router();const upload=multer({dest:path.join(process.cwd(),"uploads"),limits:{fileSize:50*1024*1024}});
function run(script,args){return new Promise((resolve,reject)=>{const p=spawn(process.env.PYTHON_COMMAND||"python",[script,...args]);let e="";p.stderr.on("data",d=>e+=d);p.on("close",c=>c===0?resolve():reject(new Error(e||"Conversion failed")))})}
router.post("/pdf-to-ppt",upload.single("file"),async(req,res)=>{
 try{if(!req.file)return res.status(400).json({message:"File required"});const out=path.join(process.cwd(),"generated",`${Date.now()}-converted.pptx`);await run(path.resolve(process.cwd(),"../python_engine/pdf_to_ppt.py"),[req.file.path,out,req.body.mode||'smart']);const s=fs.statSync(out);const f=addFile({name:path.basename(out),type:"Presentation",path:out,size:s.size});res.json({fileId:f.id})}catch(e){res.status(500).json({message:e.message})}
});
router.post("/ppt-to-pdf",upload.single("file"),async(req,res)=>{
 try{if(!req.file)return res.status(400).json({message:"File required"});const outDir=path.join(process.cwd(),"generated");await run(path.resolve(process.cwd(),"../python_engine/ppt_to_pdf.py"),[req.file.path,outDir]);const expected=path.join(outDir,path.parse(req.file.originalname).name+".pdf");if(!fs.existsSync(expected))throw new Error("LibreOffice output was not created. Install LibreOffice and add soffice to PATH.");const s=fs.statSync(expected);const f=addFile({name:path.basename(expected),type:"PDF Document",path:expected,size:s.size});res.json({fileId:f.id})}catch(e){res.status(500).json({message:e.message})}
});
export default router;
