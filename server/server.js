import "dotenv/config";import express from "express";import cors from "cors";import path from "path";import fs from "fs";
import presentationRoutes from "./routes/presentations.js";import convertRoutes from "./routes/convert.js";import researchRoutes from "./routes/research.js";import synopsisRoutes from "./routes/synopsis.js";import diagramRoutes from "./routes/diagrams.js";import fileRoutes from "./routes/files.js";
const app=express();const port=process.env.PORT||5000;
for(const d of ["uploads","generated"])fs.mkdirSync(path.join(process.cwd(),d),{recursive:true});
const allowedOrigins=(process.env.CLIENT_URL||"http://localhost:5173").split(",").map(x=>x.trim());
app.use(cors({
  origin(origin,callback){
    if(!origin || allowedOrigins.includes(origin)) return callback(null,true);
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials:true
}));
app.use(express.json({limit:"5mb"}));
app.get("/api/health",(req,res)=>res.json({success:true,message:"PresentMind AI API is running"}));
app.use("/api/presentations",presentationRoutes);app.use("/api/convert",convertRoutes);app.use("/api/research",researchRoutes);app.use("/api/synopsis",synopsisRoutes);app.use("/api/diagrams",diagramRoutes);app.use("/api/files",fileRoutes);
app.use((e,req,res,next)=>{console.error(e);res.status(500).json({message:e.message||"Server error"})});
app.listen(port,()=>console.log(`PresentMind AI server running on ${port}`));
