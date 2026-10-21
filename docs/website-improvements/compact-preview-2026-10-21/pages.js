async page => {
  await page.unroute('**/*');
  await page.route('**/*', async r=>r.request().method()==='POST'?r.abort():r.continue());
  const rows=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of ["/", "/about", "/services", "/case-studies", "/contact", "/app-catalog", "/hubspot-enablement", "/services/automation", "/services/consultancy", "/services/integrations", "/services/custom-objects", "/services/pipeline-optimization", "/services/custom-app-cards", "/case-studies/customer-lifecycle", "/case-studies/crm-data-quality", "/case-studies/finance-automation", "/case-studies/renewal-status-card", "/case-studies/pipeline-consolidation", "/blog/hubspot-aeo-smb", "/blog/hubspot-app-cards-guide", "/blog/hubspot-classic-crm-cards-sunset", "/blog/hubspot-contractor-vs-agency", "/blog/hubspot-breeze-ai-smb", "/blog/hubspot-lifecycle-stages-setup-guide", "/blog/hubspot-spring-2026-spotlight", "/blog/hubspot-onboarding-mistakes", "/blog"]) {
    const response=await page.goto('http://127.0.0.1:3102'+path);
    await page.evaluate(()=>document.fonts.ready);
    for(const width of [320,390,1440]) {
      await page.setViewportSize({width,height:900});
      rows.push(await page.evaluate(({path,status})=>({path,status,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel=canonical]')?.href,markers:/\[(INTERNAL-LINK|IMAGE):/.test(document.body.innerText),schemaValid:[...document.querySelectorAll('script[type="application/ld+json"]')].every(s=>{try{JSON.parse(s.textContent);return true}catch{return false}})}),{path,status:response.status()}));
    }
  }
  await page.goto('http://127.0.0.1:3102/hubspot-enablement');
  const slack={unavailable:await page.getByText('New installations are currently unavailable.',{exact:true}).isVisible(),installLinks:await page.locator('a[href="/api/slack/oauth"]').count()};
  return {rows,errors,slack};
}