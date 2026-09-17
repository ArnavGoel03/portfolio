#!/usr/bin/env python3
"""Bounded public GET audit. No cookies, auth, writes, or load generation."""
import concurrent.futures, datetime, hashlib, json, pathlib, subprocess
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit
ROOT = pathlib.Path(__file__).resolve().parent
CACHE = ROOT.parents[2] / '.firecrawl' / 'performance-2026-09-17'
CACHE.mkdir(parents=True, exist_ok=True)
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.js=[]; self.css=[]; self.img=[]; self.links=[]; self.modulepreloads=[]; self.title=''; self.in_title=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='title' and not self.title: self.in_title=True
        if tag=='script' and a.get('src'): self.js.append(a['src'])
        if tag=='link' and a.get('rel')=='stylesheet': self.css.append(a.get('href',''))
        if tag=='link' and a.get('rel')=='modulepreload': self.modulepreloads.append(a.get('href',''))
        if tag=='img' and a.get('src'): self.img.append({k:a[k] for k in ('src','loading','width','height','srcset','sizes') if k in a})
        if tag=='a' and a.get('href'): self.links.append(a['href'])
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
    def handle_data(self,data):
        if self.in_title:self.title+=data

def probe(item):
    url=item['url']; key=hashlib.sha256(url.encode()).hexdigest()[:16]
    body=CACHE/(key+'.body'); head=CACHE/(key+'.headers')
    args=['curl','--silent','--show-error','--location','--max-redirs','5','--connect-timeout','8','--max-time','25','--max-filesize','12000000','--compressed','--user-agent','Mozilla/5.0 (owner performance audit)','--dump-header',str(head),'--output',str(body),'--write-out','%{json}',url]
    try:
        p=subprocess.run(args,capture_output=True,text=True,timeout=28)
        meta=json.loads(p.stdout) if p.stdout else {}
        result={**item,'status':meta.get('http_code'),'effective_url':meta.get('url_effective'),'transfer_bytes':meta.get('size_download'),'ttfb_s':meta.get('time_starttransfer'),'total_s':meta.get('time_total'),'exit':p.returncode}
        if p.stderr: result['error']=p.stderr.strip()[:250]
        # Only publish allowlisted response metadata, never cookies.
        hdr={}
        for line in head.read_text(errors='replace').splitlines() if head.exists() else []:
            if line.startswith('HTTP/'):hdr={}
            if ':' in line:
                k,v=line.split(':',1);k=k.lower()
                if k in {'cache-control','content-encoding','content-type','content-length','age','server','x-vercel-cache','cf-cache-status','x-nextjs-cache','x-opennext-cache','vary','etag'}:hdr[k]=v.strip()
        result['headers']=hdr
        if body.exists():
            result['decoded_bytes']=body.stat().st_size
            result['decoded_sha256']=hashlib.sha256(body.read_bytes()).hexdigest()
            if 'text/html' in hdr.get('content-type','') and body.stat().st_size<5000000:
                page=Page();page.feed(body.read_text(errors='replace'))
                result.update(title=page.title,scripts=list(dict.fromkeys(page.js)),modulepreloads=list(dict.fromkeys(page.modulepreloads)),stylesheets=list(dict.fromkeys(page.css)),images=page.img,links=list(dict.fromkeys(page.links)))
        return result
    except Exception as e:return {**item,'error':str(e),'exit':-1}

def main():
    inv=json.loads((ROOT/'inventory.json').read_text()); items={}
    def add(url,label):
        if not url:return
        url=urljoin('https://arnavgoel.dev/',url);parsed=urlsplit(url)
        if parsed.hostname in {'youtu.be','youtube.com','chromewebstore.google.com','github.com'}:return
        normalized=url.rstrip('/') if parsed.path in ('','/') else url
        if normalized in items:items[normalized]['labels'].append(label)
        else:items[normalized]={'url':url,'labels':[label]}
    add('https://arnavgoel.dev/projects','Portfolio Projects')
    for project in inv:
        add(project.get('demo'),project['id'])
        for surface in project['surfaces']:add(surface['href'],surface['label'])
    results=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        for row in pool.map(probe,items.values()):
            results.append(row);print(row['status'] if 'status'in row else 'ERR',row['url'],row.get('transfer_bytes'),row.get('headers',{}).get('content-encoding','identity'),flush=True)
    (ROOT/'live-probes.json').write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'method':'One bounded compressed GET per public target; timings are observations, not benchmarks. HTML references do not establish browser execution or rendered visibility.','results':results},indent=2)+'\n')
if __name__=='__main__':main()
