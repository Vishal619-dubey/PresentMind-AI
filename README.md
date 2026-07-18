# PresentMind AI — Final Upgraded Build

This build includes a long-form academic synopsis engine (DOCX + PDF), two PDF-to-PPT modes, presentation generation, research assistance, diagram generation and saved file history.

## Start on Windows

```powershell
npm run install-all
python -m pip install -r python_engine\requirements.txt
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
npm run dev
```

## PDF to PPT modes
- Smart Editable: extracted headings and bullet text plus page preview
- Exact Visual: page-perfect slide images

## Synopsis output
- DOCX and PDF
- Cover page, declaration, contents, abstract, architecture, database design, methodology, testing, work plan, future scope and references
- The exact page count varies by topic and generated text, but the built-in detailed fallback is designed as a substantial academic document rather than a short summary.
