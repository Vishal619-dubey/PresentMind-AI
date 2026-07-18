import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
const dbPath=path.join(process.cwd(),"files.json");
function read(){try{return JSON.parse(fs.readFileSync(dbPath,"utf8"))}catch{return []}}
function write(x){fs.writeFileSync(dbPath,JSON.stringify(x,null,2))}
export function addFile({name,type,path:filePath,size}){
 const item={id:randomUUID(),name,type,path:filePath,size,sizeLabel:format(size),createdAt:new Date().toISOString()};
 const all=read();all.unshift(item);write(all);return item;
}
export function listFiles(){return read()}
export function getFile(id){return read().find(x=>x.id===id)}
export function removeFile(id){const all=read();const f=all.find(x=>x.id===id);write(all.filter(x=>x.id!==id));return f}
function format(n=0){if(n<1024)return `${n} B`;if(n<1048576)return `${(n/1024).toFixed(1)} KB`;return `${(n/1048576).toFixed(1)} MB`}
