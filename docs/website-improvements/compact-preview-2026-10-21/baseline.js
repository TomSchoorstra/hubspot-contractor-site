async page => {
  await page.emulateMedia({reducedMotion:'reduce'});
  const rows=[];
  for(const path of ['/', '/about']) {
    await page.goto('https://www.tomschoorstra.com'+path);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(500);
    for(const width of [390,1440]) {
      await page.setViewportSize({width,height:width===390?844:1000});
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      rows.push(await page.evaluate(path=>({path,width:innerWidth,mainWords:document.querySelector('main').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),documentHeight:document.documentElement.scrollHeight,sections:document.querySelectorAll('main>section').length,images:document.querySelectorAll('main img').length,overflow:document.documentElement.scrollWidth>innerWidth}),path));
    }
  }
  return rows;
}
