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
