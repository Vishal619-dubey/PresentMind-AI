import {Router} from "express";import fs from "fs";import {listFiles,getFile,removeFile} from "../fileStore.js";const router=Router();
router.get("/",(req,res)=>res.json(listFiles()));
router.get("/download/:id",(req,res)=>{const f=getFile(req.params.id);if(!f||!fs.existsSync(f.path))return res.status(404).json({message:"File not found"});res.download(f.path,f.name)});
router.delete("/:id",(req,res)=>{const f=removeFile(req.params.id);if(f?.path&&fs.existsSync(f.path))fs.unlinkSync(f.path);res.json({success:true})});
export default router;
