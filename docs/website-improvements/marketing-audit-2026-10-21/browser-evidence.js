async page => {
  await page.goto('https://www.tomschoorstra.com/blog/hubspot-breeze-ai-smb');
  await page.setViewportSize({width:390,height:844});
  await page.getByText('[IMAGE: Three colleagues',{exact:false}).scrollIntoViewIfNeeded();
  await page.screenshot({path:'/private/tmp/tom-website-audit-2026-10-21/breeze-mobile-overflow.png'});
  const breeze={viewport:390,scrollWidth:await page.evaluate(()=>document.documentElement.scrollWidth)};
  await page.goto('https://www.tomschoorstra.com/blog/hubspot-contractor-vs-agency');
  await page.setViewportSize({width:1440,height:1000});
  await page.getByText('[IMAGE: Two professionals',{exact:false}).scrollIntoViewIfNeeded();
  await page.screenshot({path:'/private/tmp/tom-website-audit-2026-10-21/contractor-visible-placeholder.png'});
  await page.goto('https://www.tomschoorstra.com/');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.screenshot({path:'/private/tmp/tom-website-audit-2026-10-21/home-mobile-steady.png'});
  const mobileHeader=await page.evaluate(()=>({width:innerWidth,header:document.querySelector('header').getBoundingClientRect().toJSON(),bannerText:[...document.querySelectorAll('p')].filter(p=>p.innerText.includes('Not taking on clients')).length,links:[...document.querySelectorAll('header a')].filter(a=>a.getBoundingClientRect().width>0).map(a=>({text:a.innerText,rect:a.getBoundingClientRect().toJSON()}))}));
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole('link',{name:'See the work',exact:true}).click();
  await page.waitForURL('**/case-studies');
  await page.getByRole('heading',{level:1}).waitFor();
  const tracking=await page.evaluate(()=>window.dataLayer?.filter(e=>['cta_click','page_view'].includes(e.event)).map(e=>({event:e.event,page_path:e.page_path,cta_label:e.cta_label,cta_location:e.cta_location,destination:e.destination})));
  return {breeze,mobileHeader,tracking};
}
