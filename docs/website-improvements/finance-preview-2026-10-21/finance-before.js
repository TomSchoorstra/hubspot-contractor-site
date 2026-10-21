async page => {
 await page.unroute('**/*');
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const slug of ['finance-automation','customer-lifecycle','crm-data-quality','renewal-status-card','pipeline-consolidation']) {
  const response=await page.goto('http://127.0.0.1:3102/case-studies/'+slug);
  await page.evaluate(()=>document.fonts.ready);
  for(const width of [320,390,1440]) {
   await page.setViewportSize({width,height:width===1440?1000:844});
   for(const reveal of await page.locator('main [style*="opacity: 0"]').all()) {await reveal.scrollIntoViewIfNeeded();await page.waitForTimeout(150);}
   await page.waitForTimeout(500);
   rows.push(await page.evaluate(({slug,status})=>({slug,status,width:innerWidth,words:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),text:document.querySelector('main').innerText,h1:[...document.querySelectorAll('main h1')].map(x=>x.textContent),h2:[...document.querySelectorAll('main h2')].map(x=>x.textContent),cards:document.querySelectorAll('main .rounded-2xl,main .rounded-3xl').length,overflow:document.documentElement.scrollWidth>innerWidth}),{slug,status:response.status()}));
   if(slug==='finance-automation'&&width!==320)await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/finance-before-${width}.png`,fullPage:true});
  }
 }
 return {rows,errors};
}
