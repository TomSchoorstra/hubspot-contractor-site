async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[];
 const paths=['/services/design-preview','/services/design-preview/1','/services/design-preview/2','/services/design-preview/3'];
 for(const path of paths){
  const response=await page.goto('http://127.0.0.1:3102'+path);
  await page.evaluate(()=>document.fonts.ready);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});
   rows.push(await page.evaluate(({path,status})=>({path,status,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,robots:document.querySelector('meta[name=robots]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,cards:[...document.querySelectorAll('[data-expertise-design] > li')].map(el=>({text:el.innerText,href:el.querySelector('a').getAttribute('href')})),headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(document.querySelector('main p')).fontFamily}),{path,status:response.status()}));
   if([390,1440].includes(width)){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);await page.screenshot({path:`/private/tmp/tom-expertise-designs-2026-10-22/${path.split('/').pop()}-${width}.png`,fullPage:true});}
  }
 }
 const response=await page.goto('http://127.0.0.1:3102/services');
 const original=await page.locator('main ul > li').evaluateAll(items=>items.map(el=>({title:el.querySelector('h2').textContent.replace(/ →$/,''),description:el.querySelector('p').textContent,href:el.querySelector('a').getAttribute('href')})));
 const sitemap=await (await page.request.get('http://127.0.0.1:3102/sitemap.xml')).text();
 await page.goto('http://127.0.0.1:3102/services/design-preview/1');
 await page.getByRole('link',{name:'2. Compact rows',exact:true}).click();
 await page.waitForURL('**/services/design-preview/2');
 await page.locator('[data-expertise-design="2"]').waitFor();
 const switchWorked=page.url().endsWith('/services/design-preview/2');
 const first=page.locator('[data-expertise-design] > li a').first();await first.focus();
 const focus=await first.evaluate(el=>({focused:document.activeElement===el,outline:getComputedStyle(el).outlineStyle}));
 await page.keyboard.press('Enter');
 await page.waitForURL('**/services/automation');
 const cardWorked=page.url().endsWith('/services/automation');
 const invalid=(await page.request.get('http://127.0.0.1:3102/services/design-preview/4')).status();
 await page.goto('http://127.0.0.1:3102/services/design-preview');
 return {rows,original,originalStatus:response.status(),sitemapIncludesPreviews:sitemap.includes('design-preview'),switchWorked,focus,cardWorked,invalid,errors};
}
