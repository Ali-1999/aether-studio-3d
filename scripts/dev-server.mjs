import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
const root=resolve(process.cwd());
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server=createServer(async (req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname==='/api/contact'){res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Local preview does not send email. Deploy to Cloudflare Pages and configure contact environment secrets.'}));return;}
    const normalized=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
    const file=resolve(join(root,normalized));
    if(!file.startsWith(root+'/')||!['GET','HEAD'].includes(req.method)){res.writeHead(403);res.end('Forbidden');return;}
    const st=await stat(file);if(!st.isFile())throw new Error('Not a file');
    const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
server.listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('Aether Studio running at http://localhost:'+server.address().port));
