async page => {
 await page.unroute('**/*');
 await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[];
 for(const path of ['/services','/services/custom-app-cards']) {
  await page.goto('http://127.0.0.1:3102'+path);
  await page.evaluate(()=>document.fonts.ready);
  for(const width of [390,1440]) {
   await page.setViewportSize({width,height:width===390?844:1000});
   await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)});
   await page.waitForTimeout(450);
   await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/services-before-${path.endsWith('custom-app-cards')?'cards':'index'}-${width}.png`,fullPage:true});
   const buttons=page.locator('main button[aria-expanded]');
   for(let i=0;i<await buttons.count();i++)if(await buttons.nth(i).getAttribute('aria-expanded')==='false')await buttons.nth(i).click();
   await page.waitForTimeout(350);
   rows.push(await page.evaluate(path=>({path,width:innerWidth,words:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),h2:[...document.querySelectorAll('main h2')].map(x=>x.textContent),cards:document.querySelectorAll('main .rounded-2xl,main .rounded-3xl').length,text:document.querySelector('main').innerText,overflow:document.documentElement.scrollWidth>innerWidth}),path));
   for(let i=0;i<await buttons.count();i++)if(await buttons.nth(i).getAttribute('aria-expanded')==='true')await buttons.nth(i).click();
  }
 }
 return rows;
}
