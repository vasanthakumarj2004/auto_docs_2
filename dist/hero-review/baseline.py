import json
import hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).parent
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=p.chromium.executable_path)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    errors = []
    page.on("pageerror", lambda err: errors.append(str(err)))
    response = page.goto("http://localhost:3000/", wait_until="networkidle", timeout=60000)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(1000)
    snapshot = page.evaluate('''() => {
      const hero = document.querySelector('.hero-section');
      const h1 = hero.querySelector('h1');
      const copy = h1.parentElement;
      const selectors = {
        h1,
        subtitle: copy.querySelector('p'),
        eyebrow: copy.querySelector('.eyebrow'),
        trust: [...copy.children].at(-1),
        financeButton: copy.querySelector('a[href="/finance"]'),
        logisticsButton: copy.querySelector('a[href="/logistics"]'),
        financeLabel: copy.querySelector('a[href="/finance"] .btn-arrow-label'),
        logisticsLabel: copy.querySelector('a[href="/logistics"] .btn-arrow-label'),
      };
      const typography = Object.fromEntries(Object.entries(selectors).map(([key, el]) => {
        const s = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return [key, {text: el.innerText, fontFamily:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,color:s.color,width:rect.width,height:rect.height}];
      }));
      const downstream = [...document.querySelector('main').children].filter(el => el !== hero).map(el => ({tag:el.tagName,id:el.id,heading:el.querySelector('h2,h3')?.innerText || '', text:el.innerText,html:el.outerHTML}));
      return {typography, downstream, viewport: {width:innerWidth,height:innerHeight},horizontalOverflow: document.documentElement.scrollWidth > innerWidth, fontStatus: document.fonts.status};
    }''')
    snapshot['status'] = response.status
    snapshot['errors'] = errors
    for index, section in enumerate(snapshot['downstream']):
        html = section.pop('html')
        section['sha256'] = hashlib.sha256(html.encode('utf-8')).hexdigest()
        section['textSha256'] = hashlib.sha256(section['text'].encode('utf-8')).hexdigest()
        (OUT / f'baseline-downstream-{index:02d}.html').write_text(html, encoding='utf-8')
    (OUT / 'baseline.json').write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding='utf-8')
    print(json.dumps({k:v for k,v in snapshot.items() if k != 'downstream'}, indent=2, ensure_ascii=False))
    print(f"Saved {len(snapshot['downstream'])} downstream section fingerprints")
    browser.close()
