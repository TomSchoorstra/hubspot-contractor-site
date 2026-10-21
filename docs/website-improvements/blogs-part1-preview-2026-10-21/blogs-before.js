async page => {
 await page.unroute('**/*');await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());await page.emulateMedia({reducedMotion:'reduce'});
 const slugs=['hubspot-lifecycle-stages-setup-guide','hubspot-classic-crm-cards-sunset','hubspot-breeze-ai-smb','hubspot-contractor-vs-agency','hubspot-onboarding-mistakes','hubspot-spring-2026-spotlight','hubspot-app-cards-guide','hubspot-aeo-smb'],rows=[];
 for(const slug of slugs){const response=await page.goto('http://127.0.0.1:3102/blog/'+slug);await page.evaluate(()=>document.fonts.ready);
  for(const width of [320,390,1440]){await page.setViewportSize({width,height:width===1440?1000:844});await page.waitForTimeout(150);
   rows.push(await page.evaluate(({slug,status})=>({slug,status,width:innerWidth,words:document.querySelector('main').innerText.trim().split(/\s+/).length,articleWords:document.querySelector('.prose-blog').innerText.trim().split(/\s+/).length,mainHeight:Math.round(document.querySelector('main').getBoundingClientRect().height),articleText:document.querySelector('.prose-blog').innerText,overflow:document.documentElement.scrollWidth>innerWidth}),{slug,status:response.status()}));
   if(width!==320&&slugs.indexOf(slug)<2)await page.screenshot({path:`/private/tmp/tom-compact-preview-2026-10-21/blogs-before-${slug}-${width}.png`,fullPage:true});
  }
 }
 return {rows};
}
