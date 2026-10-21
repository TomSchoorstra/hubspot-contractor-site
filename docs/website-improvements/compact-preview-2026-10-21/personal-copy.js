async page => {
  await page.unroute('**/*');
  await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
  const rows=[];
  for(const path of ['/','/about']) {
    const response=await page.goto('http://127.0.0.1:3102'+path);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(500);
    for(const width of [390,1440]) {
      await page.setViewportSize({width,height:width===390?844:1000});
      rows.push(await page.evaluate(({path,status})=>({path,status,width:innerWidth,intro:document.querySelector('main section p').textContent,description:document.querySelector('meta[name=description]').content,ogDescription:document.querySelector('meta[property="og:description"]').content,twitterDescription:document.querySelector('meta[name="twitter:description"]').content,mainWords:document.querySelector('main').innerText.trim().split(/\s+/).length,overflow:document.documentElement.scrollWidth>innerWidth}),{path,status:response.status()}));
      await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/personal-${path==='/'?'home':'about'}-${width}.png`,fullPage:true});
    }
  }
  return rows;
}
