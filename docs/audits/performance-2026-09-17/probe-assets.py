#!/usr/bin/env python3
"""Fetch distinct same-origin HTML script and stylesheet references once."""
import concurrent.futures, json
from urllib.parse import urljoin, urlsplit
from probe import ROOT, probe
pages=json.loads((ROOT/'live-probes.json').read_text())['results']
assets={}
for page in pages:
    base=page.get('effective_url',page['url'])
    for kind,key in [('js','scripts'),('js','modulepreloads'),('css','stylesheets')]:
        for ref in page.get(key,[]):
            url=urljoin(base,ref)
            if urlsplit(url).netloc!=urlsplit(base).netloc:continue
            if url not in assets:assets[url]={'url':url,'kind':kind,'pages':[]}
            assets[url]['pages'].append(page['url'])
print('Distinct same-origin script/CSS assets:',len(assets),flush=True)
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for i,row in enumerate(pool.map(probe,assets.values())):
        results.append(row)
        if i%25==0:print('Fetched',i+1,flush=True)
(ROOT/'asset-probes.json').write_text(json.dumps(results,indent=2)+'\n')
for page in pages:
    rows=[r for r in results if page['url'] in r['pages']]
    print(page['labels'][0],sum(r.get('transfer_bytes',0) or 0 for r in rows if r['kind']=='js'),sum(r.get('transfer_bytes',0) or 0 for r in rows if r['kind']=='css'),flush=True)
