async page => {
 const rows=[];
 for(const path of ['/services','/case-studies','/blog']){
  await page.goto('http://127.0.0.1:3102'+path);
  rows.push(await page.evaluate(path=>({path,title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href,paragraphs:[...document.querySelectorAll('main p')].map(p=>p.textContent),items:[...document.querySelectorAll('main ul > li')].map(li=>({title:li.querySelector('h2').textContent.replace(/ →$/,''),href:li.querySelector('a').getAttribute('href'),paragraphs:[...li.querySelectorAll('p')].map(p=>p.textContent),date:li.querySelector('time')?.getAttribute('datetime'),dateLabel:li.querySelector('time')?.textContent}))}),path));
 }
 return rows;
}
