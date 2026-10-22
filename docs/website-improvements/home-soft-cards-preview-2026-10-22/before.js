async page => {
 await page.goto('http://127.0.0.1:3102/');await page.evaluate(()=>document.fonts.ready);
 return await page.evaluate(()=>({paragraphs:[...document.querySelectorAll('main p')].map(p=>p.textContent),headings:[...document.querySelectorAll('main h1,main h2,main h3')].map(el=>({level:el.tagName,text:el.textContent})),links:[...document.querySelectorAll('main a')].map(a=>({href:a.getAttribute('href'),label:a.textContent})),title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href,sections:document.querySelectorAll('main > section').length}));
}
