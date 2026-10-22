async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[],keyboard=[],hover=[];
 for(const path of ['/services','/case-studies','/blog']){
  const response=await page.goto('http://127.0.0.1:3102'+path);await page.evaluate(()=>document.fonts.ready);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:1000});
   rows.push(await page.evaluate(({path,status})=>({path,status,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href,robots:document.querySelector('meta[name=robots]')?.content,paragraphs:[...document.querySelectorAll('main p')].map(p=>p.textContent),items:[...document.querySelectorAll('[data-content-cards] > li')].map(li=>({title:li.querySelector('h2').textContent,href:li.querySelector('a').getAttribute('href'),paragraphs:[...li.querySelectorAll('p')].map(p=>p.textContent),date:li.querySelector('time')?.getAttribute('datetime'),dateLabel:li.querySelector('time')?.textContent})),cards:[...document.querySelectorAll('[data-content-cards] > li > a')].map(el=>({background:getComputedStyle(el).backgroundColor,radius:getComputedStyle(el).borderRadius,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height})),font:getComputedStyle(document.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(document.querySelector('main p')).fontFamily}),{path,status:response.status()}));
   if([390,1440].includes(width)){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);await page.screenshot({path:`/private/tmp/tom-soft-cards-rollout-2026-10-22/${path.slice(1)}-${width}.png`,fullPage:true});}
  }
  const first=page.locator('[data-content-cards] > li > a').first();
  const before=await first.evaluate(el=>getComputedStyle(el).backgroundColor);
  await first.hover();await page.waitForTimeout(250);
  hover.push({path,before,after:await first.evaluate(el=>getComputedStyle(el).backgroundColor)});
  await page.goto('http://127.0.0.1:3102'+path);let focused=false,outline='';
  for(let i=0;i<25;i++){
   await page.keyboard.press('Tab');
   const state=await page.evaluate(()=>{const el=document.activeElement;return {focused:el?.matches('[data-content-cards] > li > a'),outline:el?getComputedStyle(el).outlineStyle:''}});
   if(state.focused){focused=true;outline=state.outline;break;}
  }
  const destination=await first.getAttribute('href');
  if(focused){await page.keyboard.press('Enter');await page.waitForURL('http://127.0.0.1:3102'+destination);}
  keyboard.push({path,focused,outline,opened:page.url().endsWith(destination)});
 }
 const paths=[...new Set(rows.flatMap(r=>r.items.map(i=>i.href)))];const links=[];
 for(const path of paths)links.push({path,status:(await page.request.get('http://127.0.0.1:3102'+path)).status()});
 const sitemap=await (await page.request.get('http://127.0.0.1:3102/sitemap.xml')).text();
 await page.goto('http://127.0.0.1:3102/services/design-preview/1');
 const preview=await page.locator('[data-expertise-design] > li > a').first().evaluate(el=>({background:getComputedStyle(el).backgroundColor,radius:getComputedStyle(el).borderRadius}));
 await page.goto('http://127.0.0.1:3102/services');
 return {rows,keyboard,hover,links,preview,sitemapCount:(sitemap.match(/<loc>/g)||[]).length,sitemapIncludesPreviews:sitemap.includes('design-preview'),errors};
}
