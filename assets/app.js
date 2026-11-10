(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const mobile = document.getElementById('mobile-nav');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mobile.hidden = isOpen;
  });
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobile.hidden = true; toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobile && !mobile.hidden) { mobile.hidden = true; toggle?.setAttribute('aria-expanded','false'); toggle?.focus(); }
  });
  document.getElementById('year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));

  const reveal = document.querySelectorAll('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .09, rootMargin: '0px 0px -30px 0px' });
    reveal.forEach(el => observer.observe(el));
  } else { reveal.forEach(el => el.classList.add('visible')); }


  // Interactive technology ecosystem — based on the candidate's supplied CV and project context.
  const technologies = [
    {name:'HTML5',cat:'frontend',label:'Frontend',symbol:'5',desc:'Used to structure responsive web pages and accessible website interfaces.',used:'Frontend implementation and website page development.',projects:[]},
    {name:'CSS3',cat:'frontend',label:'Frontend',symbol:'3',desc:'Used to build responsive layouts, visual systems and polished website interfaces.',used:'Responsive styling and interface refinement.',projects:[{label:'Degenrex',url:'https://degenrex.com'}]},
    {name:'JavaScript',cat:'frontend',label:'Frontend',symbol:'JS',desc:'Used to add interactive behaviour and client-side functionality to websites.',used:'Frontend development and interactive website features.',projects:[{label:'GitHub profile',url:'https://github.com/Ali-1999'}]},
    {name:'jQuery',cat:'frontend',label:'Frontend',symbol:'jq',desc:'A JavaScript library included in the candidate’s stated frontend toolkit.',used:'Listed in the supplied technical skills; specific project attribution is not currently documented.',projects:[]},
    {name:'Bootstrap',cat:'frontend',label:'Frontend',symbol:'B',desc:'A responsive UI framework included in the candidate’s stated frontend toolkit.',used:'Listed in the supplied technical skills; specific project attribution is not currently documented.',projects:[]},
    {name:'PHP',cat:'backend',label:'Backend',symbol:'PHP',desc:'Server-side development experience, including PHP application work.',used:'Developed and maintained PHP/CodeIgniter applications at Marksols.',projects:[{label:'GitHub profile',url:'https://github.com/Ali-1999'}]},
    {name:'CodeIgniter',cat:'backend',label:'Backend',symbol:'CI',desc:'PHP framework experience for database-driven web applications.',used:'Developed and maintained CodeIgniter applications at Marksols.',projects:[{label:'GitHub profile',url:'https://github.com/Ali-1999'}]},
    {name:'MySQL',cat:'data',label:'Database',symbol:'SQL',desc:'Relational database technology included in the candidate’s development toolkit.',used:'Database technology listed in the supplied technical profile.',projects:[]},
    {name:'MongoDB',cat:'data',label:'Database',symbol:'MDB',desc:'Document database technology included in the candidate’s development toolkit.',used:'Database technology listed in the supplied technical profile.',projects:[]},
    {name:'WordPress',cat:'cms',label:'CMS',symbol:'W',desc:'CMS experience across website content migration, maintenance and site management.',used:'Migrated website content to WordPress and managed WordPress updates and migrations.',projects:[]},
    {name:'WooCommerce',cat:'cms',label:'E-commerce',symbol:'WC',desc:'E-commerce platform experience relevant to product catalogues and online store workflows.',used:'Included in the candidate’s e-commerce and WordPress project experience.',projects:[{label:'Applinovo',url:'https://applinovo.com'}]},
    {name:'Webflow',cat:'cms',label:'CMS',symbol:'WF',desc:'Website platform experience supporting web content and frontend implementation.',used:'Supported Webflow website development and content implementation.',projects:[{label:'GitHub profile',url:'https://github.com/Ali-1999'}]},
    {name:'Git',cat:'infra',label:'Version control',symbol:'GIT',desc:'Version-control tooling used in software development workflows.',used:'Included in the candidate’s development toolset.',projects:[{label:'GitHub profile',url:'https://github.com/Ali-1999'}]},
    {name:'GitHub',cat:'infra',label:'Code hosting',symbol:'GH',desc:'Repository hosting and collaboration platform for source code and project work.',used:'Maintains and works with personal software repositories.',projects:[{label:'Open GitHub',url:'https://github.com/Ali-1999'}]},
    {name:'Cloudflare',cat:'infra',label:'Deployment',symbol:'CF',desc:'Cloud platform used in website deployment and hosting workflows.',used:'Worked with Cloudflare deployment and Worker configuration for web projects.',projects:[{label:'Docvelio',url:'https://docvelio.com'}]},
    {name:'DNS',cat:'infra',label:'Infrastructure',symbol:'DNS',desc:'Domain configuration and website infrastructure administration.',used:'Configured DNS records and supported hosting and website migrations.',projects:[]},
    {name:'cPanel',cat:'infra',label:'Hosting',symbol:'cP',desc:'Web hosting control panel included in the candidate’s hosting and deployment toolkit.',used:'Hosting administration and website deployment workflows.',projects:[]},
    {name:'Hosting & Deployment',cat:'infra',label:'Infrastructure',symbol:'DEP',desc:'Practical website hosting, migration and deployment support.',used:'Configured hosting environments, DNS and deployment workflows.',projects:[{label:'Docvelio',url:'https://docvelio.com'}]},
    {name:'SAP',cat:'business',label:'Business system',symbol:'SAP',desc:'Enterprise system experience in a marketing and CRM support context.',used:'Maintained SAP records for lead tracking and segmentation at Riphah International University.',projects:[]},
    {name:'CRM Platforms',cat:'business',label:'Business system',symbol:'CRM',desc:'Customer relationship management and lead administration workflows.',used:'Supported CRM training, lead tracking, segmentation and email marketing workflows.',projects:[]}
  ];
  const techGrid=document.getElementById('technology-grid');
  const techCount=document.getElementById('tech-count');
  const techDetail={icon:document.getElementById('tech-detail-icon'),category:document.getElementById('tech-detail-category'),title:document.getElementById('tech-detail-title'),description:document.getElementById('tech-detail-description'),projects:document.getElementById('tech-detail-projects')};
  let activeTech='PHP';
  function renderTechDetail(item){
    if(!item)return;
    activeTech=item.name;
    techDetail.icon.textContent=item.symbol;
    techDetail.category.textContent=item.label.toUpperCase()+' / PRACTICAL CONTEXT';
    techDetail.title.textContent=item.name;
    techDetail.description.textContent=item.used+' '+item.desc;
    techDetail.projects.replaceChildren();
    item.projects.forEach(project=>{
      const a=document.createElement('a');a.className='tech-project-link';a.href=project.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=project.label+' ↗';techDetail.projects.appendChild(a);
    });
    techGrid?.querySelectorAll('.tech-card').forEach(card=>{const selected=card.dataset.tech===item.name;card.classList.toggle('is-selected',selected);card.setAttribute('aria-pressed',String(selected));});
    document.querySelectorAll('[data-tech-node]').forEach(node=>node.classList.toggle('is-selected',node.dataset.techNode===item.name));
  }
  function renderTechCards(filter='all'){
    if(!techGrid)return;
    const shown=technologies.filter(t=>filter==='all'||t.cat===filter);
    techCount.textContent=String(shown.length);
    techGrid.replaceChildren();
    shown.forEach(item=>{
      const button=document.createElement('button');button.type='button';button.className='tech-card';button.dataset.tech=item.name;button.setAttribute('aria-pressed','false');
      const symbol=document.createElement('span');symbol.className='tech-card-symbol';symbol.textContent=item.symbol;
      const copy=document.createElement('span');copy.className='tech-card-copy';
      const strong=document.createElement('strong');strong.textContent=item.name;
      const small=document.createElement('small');small.textContent=item.label.toUpperCase();
      copy.append(strong,small);button.append(symbol,copy);
      button.addEventListener('click',()=>renderTechDetail(item));
      techGrid.appendChild(button);
    });
    renderTechDetail(technologies.find(t=>t.name===activeTech)||shown[0]);
  }
  if(techGrid){
    renderTechCards();
    document.querySelectorAll('[data-tech-filter]').forEach(button=>button.addEventListener('click',()=>{
      document.querySelectorAll('[data-tech-filter]').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
      renderTechCards(button.dataset.techFilter);
    }));
    document.querySelectorAll('[data-tech-node]').forEach(node=>node.addEventListener('click',()=>{
      const item=technologies.find(t=>t.name===node.dataset.techNode);if(item){const filterButton=document.querySelector('[data-tech-filter="all"]');document.querySelectorAll('[data-tech-filter]').forEach(b=>{b.classList.toggle('is-active',b===filterButton);b.setAttribute('aria-pressed',String(b===filterButton));});renderTechCards('all');renderTechDetail(item);document.getElementById('tech-detail')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'nearest'});}
    }));
  }

  const projects = [
    { slug:'synapse', title:'Synapse / Living Data', type:'experience', typeLabel:'Immersive experience', year:'2026', color:'blue', symbol:'◎', eyebrow:'INTERACTIVE DATA UNIVERSE', summary:'A responsive digital world that makes complex information tangible.', approach:'A conceptual WebGL-driven environment of moving data, layered surfaces, and gestural exploration.', outcome:'A prototype direction for an expressive and accessible visual storytelling system.' },
    { slug:'forma', title:'Forma / New Rituals', type:'identity', typeLabel:'Brand universe', year:'2026', color:'purple', symbol:'✳', eyebrow:'A NEW LANGUAGE FOR WELLNESS', summary:'A flexible, expressive identity for a new kind of everyday ritual.', approach:'A distinct editorial system combining organic 3D geometry, typography, and tactile visual language.', outcome:'A conceptual brand platform spanning identity, campaign, and digital touchpoints.' },
    { slug:'orbit', title:'Orbit / Interfaces', type:'product', typeLabel:'Digital product', year:'2026', color:'coral', symbol:'◈', eyebrow:'DIGITAL PRODUCT EXPLORATION', summary:'An elegant workspace for clarity in a complex world.', approach:'Simplified information architecture, expressive dashboard components, and progressive disclosure.', outcome:'A concept for a flexible, user-centric product design system.' },
    { slug:'element', title:'Element / Beyond Form', type:'experience', typeLabel:'Interactive experience', year:'2026', color:'green', symbol:'⬡', eyebrow:'EXPERIMENTAL WEB ART', summary:'An experimental destination where light, motion, and shape speak together.', approach:'Procedural materials, intentional animation, and responsive, tactile interactions.', outcome:'A reusable concept for immersive storytelling on the open web.' }
  ];
  window.AETHER_PROJECTS = projects;
  function projectCard(p) {
    const article = document.createElement('article'); article.className = 'project-card reveal visible'; article.dataset.category = p.type;
    const a = document.createElement('a'); a.href = '/project.html?slug=' + encodeURIComponent(p.slug); a.setAttribute('aria-label', 'View ' + p.title + ' concept');
    a.innerHTML = `<div class="project-visual ${p.color}"><span class="corner-label">${p.eyebrow}</span><div class="project-art"><div class="ring"></div><div class="shape"></div><span class="project-symbol">${p.symbol}</span></div><span class="open-symbol" aria-hidden="true">↗</span></div><div class="project-meta"><div><h3>${p.title}</h3><p>${p.typeLabel}</p></div><span class="project-year">${p.year}</span></div>`;
    article.appendChild(a); return article;
  }
  const projectGrid = document.getElementById('project-grid');
  if (projectGrid) {
    projects.forEach(p => projectGrid.appendChild(projectCard(p)));
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => {const active=b===button; b.classList.toggle('is-active',active); b.setAttribute('aria-pressed',String(active));});
      projectGrid.querySelectorAll('.project-card').forEach(card => {card.hidden = target !== 'all' && card.dataset.category !== target;});
    }));
  }
  const detail = document.getElementById('project-detail');
  if(detail) {
    const slug = new URLSearchParams(window.location.search).get('slug');
    const p=projects.find(x=>x.slug===slug);
    if (!p){ document.title='Project not found — Aether Studio'; detail.innerHTML='<div class="container legal-page"><span class="kicker">PROJECT NOT FOUND</span><h1>Nothing here, yet.</h1><p><a class="button button-primary" href="/#work">Back to projects ↗</a></p></div>'; }
    else {
      document.title=p.title+' — Aether Studio';
      detail.innerHTML=`<div class="container legal-page"><span class="kicker">DEMONSTRATION PROJECT / ${p.typeLabel.toUpperCase()}</span><h1>${p.title}</h1><p class="hero-description">${p.summary}</p><div class="project-visual ${p.color}" style="margin:60px 0;height:min(58vw,540px)"><span class="corner-label">${p.eyebrow}</span><div class="project-art"><div class="ring"></div><div class="shape"></div><span class="project-symbol">${p.symbol}</span></div></div><div class="intro-grid legal-copy"><div><h2>The idea</h2><p>${p.approach}</p></div><div><h2>The direction</h2><p>${p.outcome}</p><p class="sample-note">This is a fictional portfolio concept, not a real client commission.</p></div></div><p style="margin-top:55px"><a class="button button-primary" href="/#work">← All projects</a></p></div>`;
    }
  }
  if (!reducedMotion) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return;
        const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-5px)`;
      }); card.addEventListener('pointerleave',()=>{card.style.transform='';});
    });
    const stats=document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window) {
      const statObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if (!entry.isIntersecting) return;
        const el=entry.target,end=Number(el.dataset.count),begin=performance.now();
        const tick=(now)=>{const t=Math.min(1,(now-begin)/1300);el.textContent=String(Math.round(end*(1-Math.pow(1-t,3))));if(t<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);statObserver.unobserve(el);
      }),{threshold:.6});stats.forEach(el=>statObserver.observe(el));
    }
  } else { document.querySelectorAll('[data-count]').forEach(el=>el.textContent=el.dataset.count); }
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const status=document.getElementById('form-status'),submit=document.getElementById('submit-button');
    status.className='form-status';status.textContent='';
    if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form).entries());
    submit.disabled=true;submit.textContent='Sending…';
    try {
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
      let res;try {res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:controller.signal});}finally{clearTimeout(timeout);}
      const json=await res.json().catch(()=>({error:'Unexpected response from server.'}));
      if (!res.ok) throw new Error(json.error || 'Unable to send the enquiry.');
      status.textContent='Message sent successfully. Thank you — we’ll be in touch.';status.classList.add('success');form.reset();
    } catch (err) {status.textContent=err.name==='AbortError'?'The request timed out. Please try again.':(err.message||'Unable to send. Please try again.');status.classList.add('error');}
    finally {submit.disabled=false;submit.innerHTML='Send enquiry <span aria-hidden="true">↗</span>';}
  });
})();
