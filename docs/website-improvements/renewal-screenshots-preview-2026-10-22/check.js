async page => {
  await page.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const rows = [];
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto('http://127.0.0.1:3102/case-studies/renewal-status-card');
    await page.evaluate(() => document.fonts.ready);
    const images = page.locator('main figure img');
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
    }
    rows.push(await page.evaluate(status => ({
      width: innerWidth, status,
      h1: document.querySelectorAll('h1').length,
      overflow: document.documentElement.scrollWidth > innerWidth,
      caption: document.querySelector('main figure figcaption')?.textContent,
      images: [...document.querySelectorAll('main figure img')].map(img => ({
        src: img.getAttribute('src'), alt: img.alt, loaded: img.complete && img.naturalWidth > 0,
        naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
        width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height,
        top: img.getBoundingClientRect().top, left: img.getBoundingClientRect().left,
      })),
      preserved: ['serverless function', 'React UI Extension', 'does not update records'].every(text => document.querySelector('main').innerText.includes(text)),
      removedDuplicate: !document.querySelector('main').innerText.includes('I mapped the subscription information to three states'),
    }), response.status()));
    if ([390, 1440].includes(width)) {
      await page.screenshot({ path: `/private/tmp/tom-renewal-screenshots-2026-10-22/renewal-${width}.png`, fullPage: true });
    }
  }
  const otherCases = [];
  for (const slug of ['customer-lifecycle', 'crm-data-quality', 'finance-automation', 'pipeline-consolidation']) {
    const response = await page.goto('http://127.0.0.1:3102/case-studies/' + slug);
    otherCases.push({ slug, status: response.status(), renewalScreenshots: await page.locator('img[src*="renewal-status-card"]').count() });
  }
  await page.goto('http://127.0.0.1:3102/case-studies/renewal-status-card');
  return { rows, otherCases, errors };
}
