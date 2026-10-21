async page => {
  const rows=[]; const errors=[];
  page.on('pageerror', error=>errors.push({url:page.url(),message:error.message}));
  for(const path of ["/", "/about", "/services", "/case-studies", "/contact", "/app-catalog", "/hubspot-enablement", "/services/automation", "/services/consultancy", "/services/integrations", "/services/custom-objects", "/services/pipeline-optimization", "/services/custom-app-cards", "/case-studies/customer-lifecycle", "/case-studies/crm-data-quality", "/case-studies/finance-automation", "/case-studies/renewal-status-card", "/case-studies/pipeline-consolidation", "/blog/hubspot-aeo-smb", "/blog/hubspot-app-cards-guide", "/blog/hubspot-classic-crm-cards-sunset", "/blog/hubspot-contractor-vs-agency", "/blog/hubspot-breeze-ai-smb", "/blog/hubspot-lifecycle-stages-setup-guide", "/blog/hubspot-spring-2026-spotlight", "/blog/hubspot-onboarding-mistakes", "/blog"]) {
    try {
      await page.goto('https://www.tomschoorstra.com'+path,{waitUntil:'load',timeout:20000});
      await page.getByRole('heading',{level:1}).waitFor();
      const sizes=[];
      for(const width of [320,390,1440]) {
        await page.setViewportSize({width,height:900});
        sizes.push(await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main *, .prose-blog *, table, svg')].filter(el=>{const r=el.getBoundingClientRect();const c=getComputedStyle(el);return r.width>0 && r.right>innerWidth+2 && c.position!=='absolute' && !el.closest('[aria-hidden="true"]');}).slice(0,8).map(el=>({tag:el.tagName,text:el.textContent.slice(0,90),width:Math.round(el.getBoundingClientRect().width)}))})));
      }
      const data=await page.evaluate(()=>({h1:document.querySelector('h1')?.innerText,mainCount:document.querySelectorAll('main').length,placeholders:[...document.querySelectorAll('p')].map(p=>p.innerText).filter(t=>/\[INTERNAL-LINK:|\[IMAGE:/.test(t)),schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{const d=JSON.parse(s.textContent);return d['@type']||d['@graph']?.map(g=>g['@type']);}catch{return 'INVALID_JSON';}}),performance:{ttfb:Math.round(performance.getEntriesByType('navigation')[0]?.responseStart||0),domContentLoaded:Math.round(performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd||0)}}));
      rows.push({path,sizes,...data});
    }catch(error){rows.push({path,error:error.message});}
  }
  return {rows,errors};
}