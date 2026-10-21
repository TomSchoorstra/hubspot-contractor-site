async page => {
 await page.unroute('**/*');
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[],errors=[],allLinks=new Set();page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/case-studies/finance-automation','/case-studies/customer-lifecycle','/case-studies/crm-data-quality','/case-studies/renewal-status-card','/case-studies/pipeline-consolidation','/case-studies','/']) {
  const response=await page.goto('http://127.0.0.1:3102'+path);
  await page.evaluate(()=>document.fonts.ready);
  for(const width of (['/case-studies','/'].includes(path)?[390,1440]:[320,390,1440])) {
   await page.setViewportSize({width,height:width===1440?1000:844});
   for(const reveal of await page.locator('main [style*="opacity: 0"]').all()){await reveal.scrollIntoViewIfNeeded();await page.waitForTimeout(150);}
   await page.waitForTimeout(500);
   const row=await page.evaluate(({path,status})=>({path,status,width:innerWidth,words:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),text:document.querySelector('main').innerText,h1:[...document.querySelectorAll('main h1')].map(x=>x.textContent),h2:[...document.querySelectorAll('main h2')].map(x=>x.textContent),cards:document.querySelectorAll('main .rounded-2xl,main .rounded-3xl').length,overflow:document.documentElement.scrollWidth>innerWidth,headingFont:getComputedStyle(document.querySelector('main h1')).fontFamily,bodyFont:getComputedStyle(document.querySelector('main p')).fontFamily,canonical:document.querySelector('link[rel=canonical]')?.href,description:document.querySelector('meta[name=description]')?.content,ogDescription:document.querySelector('meta[property="og:description"]')?.content,twitterDescription:document.querySelector('meta[name="twitter:description"]')?.content,ogImage:document.querySelector('meta[property="og:image"]')?.content,schemas:[...document.querySelectorAll('main script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),links:[...document.querySelectorAll('main a')].map(x=>({label:x.innerText,href:x.getAttribute('href')}))}),{path,status:response.status()});
   rows.push(row);
   if(path==='/case-studies/finance-automation') {
    row.links.filter(x=>x.href.startsWith('/')).forEach(x=>allLinks.add(x.href));
    if(width!==320)await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/finance-after-${width}.png`,fullPage:true});
   }
  }
 }
 const links=await page.evaluate(async paths=>Promise.all(paths.map(async path=>({path,status:(await fetch(path,{method:'HEAD'})).status}))),[...allLinks]);
 await page.goto('http://127.0.0.1:3102/case-studies/finance-automation');
 await page.getByRole('navigation',{name:'Other case studies'}).getByRole('link',{name:'Seeing the renewal status directly on the deal',exact:true}).click();
 await page.waitForURL('**/case-studies/renewal-status-card');
 const navigation=await page.getByRole('heading',{level:1}).innerText();
 await page.goto('http://127.0.0.1:3102/case-studies/finance-automation');
 return {rows,links,navigation,errors};
}
