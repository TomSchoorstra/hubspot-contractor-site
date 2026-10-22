async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const response=await page.goto('http://127.0.0.1:3102/');await page.evaluate(()=>document.fonts.ready);
 const rows=[];
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  rows.push(await page.evaluate(status=>{
   const sections=document.querySelectorAll('main > section'),work=sections[1],expertise=sections[2];
   return {width:innerWidth,status,overflow:document.documentElement.scrollWidth>innerWidth,paragraphs:[...document.querySelectorAll('main p')].map(p=>p.textContent),headings:[...document.querySelectorAll('main h1,main h2,main h3')].map(el=>({level:el.tagName,text:el.textContent})),links:[...document.querySelectorAll('main a')].map(a=>({href:a.getAttribute('href'),label:a.textContent})),title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href,sections:sections.length,workCards:[...work.querySelectorAll('a.group')].map(el=>({background:getComputedStyle(el).backgroundColor,radius:getComputedStyle(el).borderRadius,h3:el.querySelectorAll('h3').length,icons:el.querySelectorAll('svg').length,iconMarkup:el.querySelector('svg').innerHTML})),expertiseIcons:expertise.querySelectorAll('h3 svg').length,expertiseBoxes:[...expertise.querySelectorAll('h3')].map(el=>getComputedStyle(el.parentElement).backgroundColor),headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(document.querySelector('main p')).fontFamily};
  },response.status()));
  if([390,1440].includes(width)){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);await page.screenshot({path:`/private/tmp/tom-home-soft-cards-2026-10-22/home-${width}.png`,fullPage:true});}
  if(width===1440)await page.locator('main > section').nth(1).screenshot({path:'/private/tmp/tom-home-soft-cards-2026-10-22/selected-work-1440.png'});
 }
 const first=page.locator('main > section').nth(1).locator('a.group').first();
 const before=await first.evaluate(el=>getComputedStyle(el).backgroundColor);await first.hover();await page.waitForTimeout(250);
 const hover={before,after:await first.evaluate(el=>getComputedStyle(el).backgroundColor)};
 await page.goto('http://127.0.0.1:3102/');let focused=false,outline='';
 for(let i=0;i<25;i++){
  await page.keyboard.press('Tab');
  const state=await page.evaluate(()=>{const el=document.activeElement;return {focused:el?.matches('main > section:nth-child(2) a.group'),outline:el?getComputedStyle(el).outlineStyle:''}});
  if(state.focused){focused=true;outline=state.outline;break;}
 }
 if(focused){await page.keyboard.press('Enter');await page.waitForURL('**/case-studies/customer-lifecycle');}
 const keyboard={focused,outline,opened:page.url().endsWith('/case-studies/customer-lifecycle')};
 const paths=[...new Set(rows[0].links.map(l=>l.href))],links=[];
 for(const path of paths)links.push({path,status:(await page.request.get('http://127.0.0.1:3102'+path)).status()});
 const overviews=[];
 for(const path of ['/services','/case-studies','/blog']){
  await page.goto('http://127.0.0.1:3102'+path);
  overviews.push(await page.evaluate(path=>({path,h2:document.querySelectorAll('[data-content-cards] h2').length,h3:document.querySelectorAll('[data-content-cards] h3').length,dates:document.querySelectorAll('[data-content-cards] time').length,icons:[...document.querySelectorAll('[data-content-cards] svg')].map(svg=>svg.innerHTML)}),path));
 }
 await page.goto('http://127.0.0.1:3102/');await page.evaluate(()=>scrollTo(0,0));
 return {rows,hover,keyboard,links,overviews,errors};
}
