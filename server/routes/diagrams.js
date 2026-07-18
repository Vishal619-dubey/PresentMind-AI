import { Router } from "express";
const router = Router();

function flowchart(prompt){
  if(prompt.toLowerCase().includes("exam")) return `flowchart TD
  A([Start]) --> B[Enter Student Credentials]
  B --> C{Credentials Valid?}
  C -->|No| D[Display Login Error]
  D --> B
  C -->|Yes| E[Open Examination Dashboard]
  E --> F[Select Available Exam]
  F --> G[Load Questions and Timer]
  G --> H[Student Answers Questions]
  H --> I{Submit Exam?}
  I -->|No| G
  I -->|Yes| J[Validate Submitted Answers]
  J --> K[Calculate Score]
  K --> L[(Store Result in Database)]
  L --> M[Display Result and Feedback]
  M --> N([End])`;
  return `flowchart TD
  A([Start]) --> B[Collect Input]
  B --> C{Input Valid?}
  C -->|No| D[Show Validation Message]
  D --> B
  C -->|Yes| E[Process Request]
  E --> F[(Save Data)]
  F --> G[Generate Output]
  G --> H([End])`;
}
function architecture(){return `flowchart LR
  U[Student / Admin] --> UI[React Web Application]
  UI --> API[Node.js + Express API]
  API --> AUTH[Authentication Service]
  API --> EXAM[Examination Engine]
  API --> REPORT[Result and Report Service]
  AUTH --> DB[(MongoDB)]
  EXAM --> DB
  REPORT --> DB
  API --> AI[AI Question and Feedback Engine]
  API --> STORE[Document / Media Storage]`;}
function dfd(){return `flowchart LR
  S[Student] -->|Login details| P1((1.0 Authentication))
  P1 -->|User record| D1[(User Database)]
  P1 -->|Access status| S
  S -->|Exam selection| P2((2.0 Conduct Examination))
  P2 -->|Questions| D2[(Question Bank)]
  P2 -->|Answers| P3((3.0 Evaluate Result))
  P3 -->|Result record| D3[(Result Database)]
  P3 -->|Score and feedback| S
  A[Admin] -->|Questions and settings| P2`;}
function timeline(){return `timeline
  title PresentMind AI Development Timeline
  Phase 1 : Requirement Analysis : UI Planning
  Phase 2 : Frontend Development : Backend APIs
  Phase 3 : AI Integration : Document Conversion
  Phase 4 : Testing : Performance Improvements
  Phase 5 : Deployment : Documentation`;}
function er(){return `erDiagram
  USER ||--o{ PRESENTATION : creates
  USER ||--o{ DOCUMENT : uploads
  USER ||--o{ RESEARCH_PROJECT : owns
  PRESENTATION ||--o{ SLIDE : contains
  RESEARCH_PROJECT ||--o{ DIAGRAM : includes
  USER { string id PK string name string email }
  PRESENTATION { string id PK string userId FK string title date createdAt }
  SLIDE { string id PK string presentationId FK string heading int position }
  DOCUMENT { string id PK string userId FK string filename string format }
  RESEARCH_PROJECT { string id PK string userId FK string title }
  DIAGRAM { string id PK string projectId FK string type string sourceCode }`;}

router.post("/generate",(req,res)=>{
  const {type="Flowchart",prompt=""}=req.body;
  let mermaid=flowchart(prompt);
  if(type==="Architecture") mermaid=architecture();
  else if(type==="DFD") mermaid=dfd();
  else if(type==="Timeline") mermaid=timeline();
  else if(type==="ER Diagram") mermaid=er();
  res.json({prompt,type,mermaid});
});
export default router;
