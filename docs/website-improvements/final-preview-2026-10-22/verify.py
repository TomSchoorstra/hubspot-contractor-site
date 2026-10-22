import json,collections,xml.etree.ElementTree as ET
from pathlib import Path
p=Path(__file__).resolve().parent
a=json.loads((p/'after.json').read_text());b=json.loads((p/'before.json').read_text());paths=json.loads((p/'paths.json').read_text())
bm={(x['path'],x['width']):x for x in b['rows']}
assert len(a['rows'])==108 and not a['errors']
for x in a['rows']:
 assert x['status']==200 and not x['overflow'] and len(x['h1'])==1 and not x['markers'],(x['path'],x['width'])
 assert 'Space Grotesk' in x['headingFont'] and 'Geist' in x['bodyFont']
 assert x['canonical']=='https://www.tomschoorstra.com'+x['path'],x['canonical']
 assert all(x.get(k) for k in ['title','description','ogTitle','ogDescription','ogImage','twitterImage'])
 assert all(im['alt'] is not None and im['loaded'] for im in x['images'])
 assert any(s.get('@type')=='Person' for s in x['schemas'])
 assert not any(s.get('@type')=='ProfessionalService' for s in x['schemas'])
 if x['path'].startswith('/blog/'):
  assert x['mainText']==bm[x['path'],x['width']]['mainText'],'blog content changed'
  assert any(s.get('@type')=='BlogPosting' for s in x['schemas'])
  assert not any(s.get('@type')=='FAQPage' for s in x['schemas'])
 if x['path'].startswith(('/case-studies/','/services/')):
  for paragraph in bm[x['path'],x['width']]['paragraphs']:
   if paragraph.startswith("I'm not taking on client projects"):continue
   assert paragraph in x['paragraphs'],(x['path'],paragraph)
 assert not any('not taking on client projects' in paragraph for paragraph in x['paragraphs']) if x['path'].startswith(('/case-studies','/services')) else True
 assert not x.get('robots') or 'noindex' not in x['robots']
 headings=[int(h['level'][1]) for h in x['headings']]
 assert all(y<=z+1 for z,y in zip(headings,headings[1:])),(x['path'],headings)
assert all(x['status']==200 for x in a['links'])
by_path={x['path']:x for x in a['rows'] if x['width']==390}
# All important routes remain reachable within two links, including links in global navigation.
dist={'/':0};q=collections.deque(['/'])
while q:
 path=q.popleft()
 for link in by_path[path]['links']:
  target=link['href'].split('#')[0].split('?')[0]
  if target in by_path and target not in dist:dist[target]=dist[path]+1;q.append(target)
assert set(dist)==set(paths) and max(dist.values())<=2,dist
for path in paths:
 mobile=by_path[path]['mainText'].split()
 for x in a['rows']:
  if x['path']==path:assert x['mainText'].split()==mobile,('responsive content',path)
metrics=[]
for path in paths:
 x=by_path[path];y=bm[path,390]
 metrics.append({'path':path,'before_words':y['words'],'after_words':x['words'],'before_main_height':y['mainHeight'],'after_main_height':x['mainHeight']})
(p/'metrics.json').write_text(json.dumps(metrics,indent=2)+'\n')
print('PASS:',len(a['rows']),'page/viewport checks;',len(a['links']),'internal destinations; all 27 routes within two clicks; all 8 blog texts unchanged; case/expertise proof preserved.')
print(json.dumps([x for x in metrics if x['before_words']!=x['after_words'] or x['path']=='/blog'],indent=2))

# These checks read the separately captured mocked interaction results.
i=json.loads((p/'interactions.json').read_text());f=json.loads((p/'form.json').read_text())
assert not i['errors'] and all(not r['clipped'] for r in i['banner'])
assert i['bannerDismissPersisted'] and i['menu']['trappedTabSteps']==22 and i['menu']['buttonClose'] and i['menu']['desktopResize']
assert i['menu']['escape']['active']=='Open menu' and i['menu']['escape']['backgroundReleased']
assert i['journey']==['/case-studies','/case-studies/customer-lifecycle','/services/custom-objects','/about','/contact']
assert i['slack']['unavailable'] and i['slack']['installLinks']==0
assert i['slack']['oauth']['status']==307 and 'error=unavailable' in i['slack']['oauth']['location']
assert i['redirect']=={'status':308,'location':'https://www.tomschoorstra.com/about'}
assert all(r['status']==404 for r in i['notFound'])
xml=ET.fromstring(i['sitemap']);ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
locations={node.find('s:loc',ns).text.rstrip('/') for node in xml.findall('s:url',ns)}
assert locations=={'https://www.tomschoorstra.com'+('' if path=='/' else path) for path in paths}
assert 'Disallow: /l/' in i['robots'] and 'https://www.tomschoorstra.com/sitemap.xml' in i['robots']
assert f['startFromEmail']==f['startAfterAllFields']==1
assert f['invalid']=={'focus':'name','fields':['name','email','message']}
assert f['error']['leads']==0 and f['error']['preservedMessage']=='This is an intercepted local preview check. No message is sent.'
assert f['successLeads']==1 and len(f['requests'])==2 and all(r['payload']['company']=='' for r in f['requests'])
for field in ['title','description']:
 values=[by_path[path][field] for path in paths];assert len(values)==len(set(values)),('duplicate',field)
print('PASS: menu, banner, story journey, blog route, mock form, redirects, 404s, social image, robots and 27 sitemap URLs. Unique titles/descriptions.')
