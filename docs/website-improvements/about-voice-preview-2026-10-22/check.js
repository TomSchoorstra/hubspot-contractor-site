async page => {
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[];
 for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});
  const response=await page.goto('http://127.0.0.1:3102/about');
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('main img').evaluate(img=>img.decode());
  rows.push(await page.evaluate(status=>{
   const main=document.querySelector('main'),details=main.querySelector('details');
   return {width:innerWidth,status,overflow:document.documentElement.scrollWidth>innerWidth,h1:[...main.querySelectorAll('h1')].map(x=>x.textContent),headings:[...main.querySelectorAll('h1,h2,h3')].map(x=>({level:x.tagName,text:x.textContent})),visibleWords:main.innerText.trim().split(/\s+/).length,allWords:main.textContent.trim().split(/\s+/).length,height:Math.round(main.getBoundingClientRect().height),text:main.innerText,detailsClosed:!details.open,certifications:details.querySelectorAll('li').length,imageLoaded:main.querySelector('img').complete&&main.querySelector('img').naturalWidth>0,font:getComputedStyle(main.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(main.querySelector('p')).fontFamily,title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href};
  },response.status()));
  if([390,1440].includes(width)){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(350);await page.screenshot({path:`/private/tmp/tom-about-voice-2026-10-22/about-${width}.png`,fullPage:true});}
 }
 const summary=page.locator('main summary');
 await summary.focus(); await page.keyboard.press('Enter');
 const opened=await page.locator('main details').evaluate(el=>el.open);
 const listVisible=await page.locator('main details li').first().isVisible();
 await page.keyboard.press('Space');
 const closed=await page.locator('main details').evaluate(el=>!el.open);
 const focusRetained=await summary.evaluate(el=>document.activeElement===el);
 const paths=['/case-studies','/case-studies/customer-lifecycle','/contact'];
 const links=[];for(const path of paths){const response=await page.request.get('http://127.0.0.1:3102'+path);links.push({path,status:response.status()});}
 await page.goto('http://127.0.0.1:3102/about');
 return {rows,disclosure:{opened,listVisible,closed,focusRetained},links,errors};
}
