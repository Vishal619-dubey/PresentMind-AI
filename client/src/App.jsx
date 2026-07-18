import React from "react";
import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CreatePresentation from "./pages/CreatePresentation";
import Converter from "./pages/Converter";
import Research from "./pages/Research";
import Synopsis from "./pages/Synopsis";
import Diagrams from "./pages/Diagrams";
import Files from "./pages/Files";
import Placeholder from "./pages/Placeholder";
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="/create" element={<CreatePresentation/>}/><Route path="/pdf-to-ppt" element={<Converter mode="pdf-to-ppt"/>}/><Route path="/ppt-to-pdf" element={<Converter mode="ppt-to-pdf"/>}/><Route path="/research" element={<Research/>}/><Route path="/synopsis" element={<Synopsis/>}/><Route path="/diagrams" element={<Diagrams/>}/><Route path="/files" element={<Files/>}/><Route path="/templates" element={<Placeholder title="Templates"/>}/><Route path="/settings" element={<Placeholder title="Settings"/>}/></Route></Routes>}
