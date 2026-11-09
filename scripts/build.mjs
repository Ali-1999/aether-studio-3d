import { mkdir, cp, rm, copyFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const root=resolve('.');const out=join(root,'dist');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const file of ['index.html','project.html','privacy.html','terms.html','robots.txt','_headers']) await copyFile(join(root,file),join(out,file));
await cp(join(root,'assets'),join(out,'assets'),{recursive:true});
await writeFile(join(out,'BUILD_INFO.txt'),'Aether Studio static build. Deploy the Cloudflare Pages Function from project-root functions/ directory.\n');
console.log('Build complete: dist/');
