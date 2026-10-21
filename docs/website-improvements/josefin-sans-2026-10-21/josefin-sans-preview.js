async page => {
  await page.emulateMedia({reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  await page.route('**/*', async route=>{
    if(route.request().method()==='POST') return route.abort();
    return route.continue();
  });
  const rows=[];
  for(const path of ['/', '/about','/contact']) {
    await page.goto('http://127.0.0.1:3102'+path);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(500);
    for(const width of [390,1440]) {
      await page.setViewportSize({width,height:width===390?844:1000});
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      rows.push(await page.evaluate(path=>({path,width:innerWidth,mainWords:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),documentHeight:document.documentElement.scrollHeight,sections:document.querySelectorAll('main>section').length,images:document.querySelectorAll('main img').length,overflow:document.documentElement.scrollWidth>innerWidth,canonical:document.querySelector('link[rel=canonical]')?.href}),path));
      await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/josefin-${path==='/'?'home':path.slice(1)}-${width}.png`,fullPage:true});
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:3102');
  await page.getByRole('button',{name:'Open menu'}).click();
  const menuOpen=await page.getByRole('button',{name:'Close menu'}).isVisible();
  await page.getByRole('button',{name:'Close menu'}).click();
  return {rows,menuOpen,errors};
}
