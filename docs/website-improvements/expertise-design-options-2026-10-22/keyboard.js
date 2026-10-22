async page => {
 const results=[];
 for(const variant of ['1','2','3']){
  await page.goto('http://127.0.0.1:3102/services/design-preview/'+variant);
  let focused=false,outline='';
  for(let i=0;i<30;i++){
   await page.keyboard.press('Tab');
   const state=await page.evaluate(()=>{const el=document.activeElement;return {focused:el?.matches('[data-expertise-design] > li a'),outline:el?getComputedStyle(el).outlineStyle:''}});
   if(state.focused){focused=true;outline=state.outline;break;}
  }
  if(focused){await page.keyboard.press('Enter');await page.waitForURL('**/services/automation');}
  results.push({variant,focused,outline,opened:page.url().endsWith('/services/automation')});
 }
 await page.goto('http://127.0.0.1:3102/services/design-preview');
 return results;
}
