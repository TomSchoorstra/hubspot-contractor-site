async page => {
  let mode='error'; const requests=[];
  await page.unroute('**/*');
  await page.route('**/*',async route=>{
    const r=route.request();
    if(r.method()==='POST') {
      if(new URL(r.url()).hostname==='formspree.io') {
        requests.push({mode,payload:JSON.parse(r.postData())});
        return route.fulfill({status:mode==='error'?500:200,contentType:'application/json',body:mode==='error'?'{"error":"Mock failure"}':'{"ok":true}'});
      }
      return route.abort();
    }
    return route.continue();
  });
  await page.goto('http://127.0.0.1:3102/contact');
  await page.evaluate(()=>{document.documentElement.dataset.siteEnv='production';window.dataLayer=[]});
  await page.locator('#email').focus();
  const startFromEmail=await page.evaluate(()=>window.dataLayer.filter(x=>x.event==='form_start').length);
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  const invalid=await page.evaluate(()=>({focus:document.activeElement.id,fields:[...document.querySelectorAll('[aria-invalid=true]')].map(x=>x.id)}));
  await page.locator('#name').fill('Preview test');
  await page.locator('#email').fill('preview@example.com');
  await page.locator('#message').fill('This is an intercepted local preview check. No message is sent.');
  const startAfterAllFields=await page.evaluate(()=>window.dataLayer.filter(x=>x.event==='form_start').length);
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  await page.getByText('Something went wrong. Please try again or reach out directly on LinkedIn.').waitFor();
  const error={preservedMessage:await page.locator('#message').inputValue(),leads:await page.evaluate(()=>window.dataLayer.filter(x=>x.event==='generate_lead').length)};
  mode='success';
  await page.getByRole('button',{name:'Send message',exact:true}).click();
  await page.getByRole('heading',{name:'Message sent!'}).waitFor();
  const successLeads=await page.evaluate(()=>window.dataLayer.filter(x=>x.event==='generate_lead').length);
  await page.screenshot({path:'/private/tmp/tom-compact-preview-2026-10-21/contact-mocked-success.png'});
  return {startFromEmail,startAfterAllFields,invalid,error,successLeads,requests};
}
