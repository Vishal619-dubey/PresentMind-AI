import subprocess,sys,os
source,outdir=sys.argv[1],sys.argv[2]
cmd=["soffice","--headless","--convert-to","pdf","--outdir",outdir,source]
p=subprocess.run(cmd,capture_output=True,text=True)
if p.returncode!=0:raise SystemExit(p.stderr or p.stdout)
