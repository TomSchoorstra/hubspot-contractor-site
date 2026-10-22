async page=>{
 await page.unroute('**/*');await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:3102/');await page.evaluate(()=>{localStorage.removeItem('banner-dismissed');window.dispatchEvent(new Event('banner-dismissed'))});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(600);
 const banner=[];
 for(const width of [1440,320,390,768,320]){await page.setViewportSize({width,height:844});await page.waitForTimeout(600);banner.push(await page.evaluate(()=>{const p=[...document.querySelectorAll('p')].find(x=>x.textContent.includes('Personal portfolio.'));const box=p.closest('.overflow-hidden');const r=p.getBoundingClientRect(),b=box.getBoundingClientRect();return {width:innerWidth,textBottom:r.bottom,wrapperBottom:b.bottom,clipped:r.bottom>b.bottom+1,wrapperStyle:box.getAttribute('style')}}));}
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.waitForTimeout(600);
 const menu=await page.evaluate(()=>({active:document.activeElement?.getAttribute('aria-label'),dialogs:document.querySelectorAll('[role=dialog]').length,bodyOverflow:document.body.style.overflow}));
 await page.keyboard.press('Tab');menu.afterTab=await page.evaluate(()=>({tag:document.activeElement?.tagName,text:document.activeElement?.textContent,href:document.activeElement?.getAttribute('href')}));
 await page.keyboard.press('Escape');await page.waitForTimeout(600);menu.afterEscape=await page.evaluate(()=>({active:document.activeElement?.getAttribute('aria-label'),bodyOverflow:document.body.style.overflow}));
 return {banner,menu};
}