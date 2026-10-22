async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.setViewportSize({width:1440,height:1000});
 const response=await page.goto('http://127.0.0.1:3102/about');
 await page.locator('.about-tool-ball').first().hover();
 await page.mouse.move(0,0);
 await page.waitForTimeout(4900);
 const results=[];
 for(let i=0;i<5;i++){
  const ornament=page.locator('.about-tool-ornament').nth(i),ball=ornament.locator('.about-tool-ball');
  await ball.hover();await page.waitForTimeout(150);
  const moving=await ornament.evaluate(el=>({transform:getComputedStyle(el).transform,active:el.getAnimations().filter(a=>a.playState==='running').length}));
  await page.mouse.move(0,0);
  const afterLeave=await ornament.evaluate(el=>el.getAnimations().some(a=>a.playState==='running'));
  await ornament.evaluate(el=>Promise.all(el.getAnimations().map(a=>a.finished.catch(()=>{}))));
  const resting=await ornament.evaluate(el=>({transform:getComputedStyle(el).transform,active:el.getAnimations().length}));
  results.push({i,moving,afterLeave,resting});
 }
 const first=page.locator('.about-tool-ornament').first();
 await first.locator('.about-tool-ball').hover();
 const retrigger=await first.evaluate(el=>el.getAnimations().some(a=>a.playState==='running'));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForFunction(()=>[...document.querySelectorAll('.about-tool-ornament')].every(el=>el.getAnimations().length===0));
 await page.mouse.move(0,0);await first.locator('.about-tool-ball').hover();
 const reduced=await first.evaluate(el=>el.getAnimations().length===0);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.waitForTimeout(4900);
 await first.locator('.about-tool-ball').dispatchEvent('pointerenter',{pointerType:'touch'});
 const touchIgnored=await first.evaluate(el=>el.getAnimations().length===0);
 await page.emulateMedia({reducedMotion:'reduce'});
 const rows=[];
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  rows.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,certifications:[...document.querySelectorAll('main aside li')].map(el=>el.innerText),tools:document.querySelector('main dl').innerText,logos:[...document.querySelectorAll('.about-tool-ball img')].map(img=>({alt:img.alt,loaded:img.complete&&img.naturalWidth>0}))})));
 }
 return {status:response.status(),results,retrigger,reduced,touchIgnored,rows,errors};
}
