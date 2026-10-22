import json
from pathlib import Path
p=Path(__file__).resolve().parent
a=json.loads((p/'after.json').read_text());b=json.loads((p/'before.json').read_text())
bm={(x['slug'],x['width']):x for x in b['rows']}
pair=['hubspot-app-cards-guide','hubspot-aeo-smb']
assert len(a['rows'])==27
for x in a['rows']:
 assert x['status']==200 and len(x['h1'])==1 and not x['overflow'],x['slug']
 assert 'Space Grotesk' in x['headingFont'] and 'Geist' in x['bodyFont']
 assert x['canonical']=='https://www.tomschoorstra.com'+x['path']
 assert x['description'] and x['ogDescription'] and x['ogImage'] and not x['oldCta']
 if x['slug']=='index':continue
 assert x['articleTag']=='ARTICLE'
 blog=next(s for s in x['schemas'] if s.get('@type')=='BlogPosting')
 assert any(s.get('@type')=='BreadcrumbList' for s in x['schemas'])
 assert not any(s.get('@type')=='FAQPage' for s in x['schemas'])
 if x['slug'] in pair:
  assert blog['dateModified']=='2026-10-22'
  assert blog['datePublished']=={'hubspot-app-cards-guide':'2026-06-25','hubspot-aeo-smb':'2026-06-28'}[x['slug']]
  assert any(t['date']=='2026-10-22' for t in x['times'])
 else:
  for key in ['articleText','times','schemas']:assert x[key]==bm[x['slug'],x['width']][key],(x['slug'],key)
assert not a['errors'] and all(l['status']==200 for l in a['links'])
assert a['navigation']=='Seeing the renewal status directly on the deal'
metrics=[]
for slug in pair:
 x=next(x for x in a['rows'] if x['slug']==slug and x['width']==390);y=bm[slug,390]
 metrics.append(dict(slug=slug,before_article_words=y['articleWords'],after_article_words=x['articleWords'],article_reduction_percent=round(100*(1-x['articleWords']/y['articleWords'])),before_main_height=y['mainHeight'],after_main_height=x['mainHeight']))
(p/'metrics.json').write_text(json.dumps(metrics,indent=2)+'\n')
print(json.dumps(metrics,indent=2))
print('PASS: 27 checks,',len(a['links']),'internal destinations, actual case navigation, six unchanged bodies/dates/schemas; FAQPage absent on all eight.')
