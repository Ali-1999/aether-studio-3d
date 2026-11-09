// Cloudflare Pages Function. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in Pages settings.
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control':'no-store', 'x-content-type-options':'nosniff' } });
const validEmail = s => typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export async function onRequestPost({ request, env }) {
  const type = request.headers.get('content-type') || '';
  if (!type.toLowerCase().includes('application/json')) return json({error:'Send JSON data.'},415);
  if (Number(request.headers.get('content-length') || 0) > 12000) return json({error:'Message too large.'},413);
  let body;try {body=await request.json();}catch{return json({error:'Invalid JSON.'},400);}
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({error:'Invalid form data.'},400);
  const { name,email,service,message }=body;
  if(typeof name!=='string'||name.trim().length<2||name.length>100||!validEmail(email)||typeof service!=='string'||!['Immersive experience','Digital product','Brand universe','Something else'].includes(service)||typeof message!=='string'||message.trim().length<20||message.length>5000) return json({error:'Please check every field and try again.'},400);
  if(!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) return json({error:'Contact delivery is not configured. Please contact the website operator.'},503);
  const safe=(s)=>s.replace(/[\r\n]+/g,' ').trim();
  const payload={from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],subject:`Aether Studio enquiry: ${safe(service)}`,reply_to:safe(email),text:`New enquiry\n\nName: ${safe(name)}\nEmail: ${safe(email)}\nService: ${safe(service)}\n\nMessage:\n${message.trim()}`};
  try {
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!response.ok){console.error('Mail API rejected the request',response.status);return json({error:'Unable to deliver your message. Please try again later.'},502);}
    return json({ok:true});
  } catch(e) {console.error('Mail API network error');return json({error:'Unable to deliver your message. Please try again later.'},502);}
}
export function onRequestGet(){return json({error:'Method not allowed.'},405);}
