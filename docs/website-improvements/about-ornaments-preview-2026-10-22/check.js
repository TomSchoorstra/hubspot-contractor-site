async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 const response=await page.goto('http://127.0.0.1:3102/about');
 await page.emulateMedia({reducedMotion:'no-preference'});
 const motion=await page.locator('.about-tool-ornament').evaluateAll(tags=>tags.map(tag=>{const s=getComputedStyle(tag);return {name:s.animationName,duration:s.animationDuration,iterations:s.animationIterationCount,delay:s.animationDelay}}));
 await page.emulateMedia({reducedMotion:'reduce'});
 const reduced=await page.locator('.about-tool-ornament').evaluateAll(tags=>tags.every(tag=>getComputedStyle(tag).animationName==='none'));
 const rows=[];
 for(const width of [320,390,768,1024,1440,1665]){
  await page.setViewportSize({width,height:1000});await page.evaluate(()=>document.fonts.ready);
  for(const image of await page.locator('main img').all())await image.evaluate(img=>img.decode());
  rows.push(await page.evaluate(status=>{
   const main=document.querySelector('main'),certs=main.querySelector('aside');
   const list=main.querySelector('ul[aria-label="Tools I work with"]');
   return {width:innerWidth,status,overflow:document.documentElement.scrollWidth>innerWidth,h1:main.querySelectorAll('h1').length,headings:[...main.querySelectorAll('h1,h2,h3')].map(x=>({level:x.tagName,text:x.textContent})),role:main.innerText.includes("At AIHR, I'm responsible for our tech stack"),oldExamples:main.innerText.includes('At AIHR, I led the account-based CRM project'),certifications:[...certs.querySelectorAll('li')].map(li=>({text:li.innerText,visible:li.getBoundingClientRect().height>0})),disclosures:main.querySelectorAll('details').length,groups:main.querySelectorAll('dl dt').length,logos:[...list.querySelectorAll('img')].map(img=>({alt:img.alt,loaded:img.complete&&img.naturalWidth>0,width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height})),balls:[...main.querySelectorAll(".about-tool-ball")].map(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height})),portrait:main.querySelector('img').complete,headingFont:getComputedStyle(main.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(main.querySelector('p')).fontFamily,canonical:document.querySelector('link[rel=canonical]').href,certsBox:{x:certs.getBoundingClientRect().x,y:certs.getBoundingClientRect().y,width:certs.getBoundingClientRect().width},mainHeight:Math.round(main.getBoundingClientRect().height)};
  },response.status()));
  if([390,768,1440].includes(width)){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(350);await page.locator('main > section').first().screenshot({path:`/private/tmp/tom-about-ornaments-2026-10-22/about-${width}.png`});}
 }
 const links=[];for(const path of ['/case-studies','/case-studies/customer-lifecycle','/contact'])links.push({path,status:(await page.request.get('http://127.0.0.1:3102'+path)).status()});
 return {motion,reduced,rows,links,errors};
}
