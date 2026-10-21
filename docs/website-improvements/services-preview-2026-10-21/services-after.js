async page => {
 await page.unroute('**/*');
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[],errors=[],allLinks=new Set();page.on('pageerror',e=>errors.push(e.message));
 const paths=['/services','/services/automation','/services/consultancy','/services/integrations','/services/custom-objects','/services/pipeline-optimization','/services/custom-app-cards'];
 for(const path of paths) {
  const response=await page.goto('http://127.0.0.1:3102'+path);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(500);
  for(const width of [320,390,1440]) {
   await page.setViewportSize({width,height:width===1440?1000:844});
   const row=await page.evaluate(({path,status})=>({path,status,width:innerWidth,words:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),h1:[...document.querySelectorAll('main h1')].map(x=>x.textContent),h2:[...document.querySelectorAll('main h2')].map(x=>x.textContent),cards:document.querySelectorAll('main .rounded-2xl,main .rounded-3xl').length,text:document.querySelector('main').innerText,overflow:document.documentElement.scrollWidth>innerWidth,headingFont:getComputedStyle(document.querySelector('main h1')).fontFamily,canonical:document.querySelector('link[rel=canonical]')?.href,description:document.querySelector('meta[name=description]')?.content,ogImage:document.querySelector('meta[property="og:image"]')?.content,schemas:[...document.querySelectorAll('main script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),links:[...document.querySelectorAll('main a')].map(x=>({label:x.innerText,href:x.getAttribute('href')})),accordionButtons:document.querySelectorAll('main button[aria-expanded]').length}),{path,status:response.status()});
   rows.push(row);
   row.links.filter(x=>x.href.startsWith('/')).forEach(x=>allLinks.add(x.href));
   if(width!==320)await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/services-after-${path==='/services'?'index':path.split('/').pop()}-${width}.png`,fullPage:true});
  }
 }
 const links=await page.evaluate(async paths=>Promise.all(paths.map(async path=>({path,status:(await fetch(path,{method:'HEAD'})).status}))),[...allLinks]);
 await page.goto('http://127.0.0.1:3102/services');
 await page.getByRole('link',{name:'HubSpot custom app cards',exact:true}).click();
 await page.waitForURL('**/services/custom-app-cards');
 await page.getByRole('link',{name:'See the renewal-status card case',exact:true}).click();
 await page.waitForURL('**/case-studies/renewal-status-card');
 const navigation=await page.getByRole('heading',{level:1}).innerText();
 await page.goto('http://127.0.0.1:3102/services');
 return {rows,links,navigation,errors};
}
