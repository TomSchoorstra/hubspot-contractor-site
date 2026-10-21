async page => {
  const intercepted=[];
  let mode='error';
  await page.route('**/*',async route=>{
    const req=route.request();
    if(req.method()==='POST') {
      if(new URL(req.url()).hostname==='formspree.io') {
        intercepted.push({host:new URL(req.url()).hostname,mode});
        await route.fulfill({status:mode==='error'?500:200,contentType:'application/json',body:JSON.stringify(mode==='error'?{error:'Audit mocked error'}:{ok:true})});
      } else await route.abort();
    } else await route.continue();
  });
  await page.goto('https://www.tomschoorstra.com/contact');
  await page.setViewportSize({width:390,height:844});
  await page.locator('#email').fill('audit@example.com');
  const formStartAfterEmail=await page.evaluate(()=>window.dataLayer?.filter(x=>x.event==='form_start').length||0);
  await page.locator('#name').fill('Website audit');
  const formStartAfterName=await page.evaluate(()=>window.dataLayer?.filter(x=>x.event==='form_start').length||0);
  await page.locator('#message').fill('This is a local browser audit test. This request is intercepted and is not sent.');
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  await page.getByText('Something went wrong. Please try again or reach out directly on LinkedIn.').waitFor();
  const errorPreservesInput=await page.locator('#message').inputValue();
  const errorLeads=await page.evaluate(()=>window.dataLayer?.filter(x=>x.event==='generate_lead').length||0);
  mode='success';
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  await page.getByRole('heading',{name:'Message sent!'}).waitFor();
  const leadEvents=await page.evaluate(()=>window.dataLayer?.filter(x=>x.event==='generate_lead').map(x=>({event:x.event,form_name:x.form_name,page_path:x.page_path})));
  await page.screenshot({path:'/private/tmp/tom-website-audit-2026-10-21/contact-mock-success.png'});
  await page.goto('https://www.tomschoorstra.com/');
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.getByRole('button',{name:'Close menu',exact:true}).waitFor({state:'visible'});
  const focusOnOpen=await page.evaluate(()=>({tag:document.activeElement.tagName,label:document.activeElement.getAttribute('aria-label'),text:document.activeElement.textContent?.slice(0,70)}));
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Close menu',exact:true}).waitFor({state:'hidden'});
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.getByRole('link',{name:'Services',exact:true}).filter({visible:true}).first().click();
  await page.waitForURL('**/services');
  await page.getByRole('button',{name:'Close menu',exact:true}).waitFor({state:'hidden'});
  const menuClosesOnNavigate=true;
  const headerOnMobile=await page.evaluate(()=>[...document.querySelectorAll('header a')].filter(a=>a.textContent.includes('Plan a call')).map(a=>({text:a.innerText,display:getComputedStyle(a).display,visible:a.getBoundingClientRect().width>0})));
  await page.goto('https://www.tomschoorstra.com/services/custom-app-cards');
  const question=page.getByRole('button',{name:'What HubSpot plan do I need?'});
  await question.click();
  const faqExpanded=await question.getAttribute('aria-expanded');
  return {intercepted,formStartAfterEmail,formStartAfterName,errorPreservesInput,errorLeads,leadEvents,focusOnOpen,menuClosesOnNavigate,headerOnMobile,faqExpanded};
}
