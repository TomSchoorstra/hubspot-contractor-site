async page => {
 await page.unroute('**/*');await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[];
 for(const path of ['/case-studies','/case-studies/customer-lifecycle']) {
  const response=await page.goto('http://127.0.0.1:3102'+path);await page.evaluate(()=>document.fonts.ready);
  for(const width of [390,1440]) {
   await page.setViewportSize({width,height:width===1440?1000:844});
   for(const reveal of await page.locator('main [style*="opacity: 0"]').all()){await reveal.scrollIntoViewIfNeeded();await page.waitForTimeout(150);}
   await page.waitForTimeout(500);
   rows.push(await page.evaluate(({path,status})=>({path,status,width:innerWidth,words:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),text:document.querySelector('main').innerText,cards:document.querySelectorAll('main .rounded-2xl,main .rounded-3xl').length,overflow:document.documentElement.scrollWidth>innerWidth}),{path,status:response.status()}));
   await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/cases-before-${path==='/case-studies'?'index':'customer-lifecycle'}-${width}.png`,fullPage:true});
  }
 }
 return {rows};
}
