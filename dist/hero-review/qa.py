import argparse
import hashlib
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:3101/')
parser.add_argument('--label', default='initial')
args = parser.parse_args()
OUT = Path(__file__).parent
baseline = json.loads((OUT / 'baseline.json').read_text(encoding='utf-8'))

STYLE_JS = '''() => {
  const hero = document.querySelector('.hero-section');
  const h1 = hero.querySelector('h1');
  const copy = h1.parentElement;
  const els = {h1, subtitle:copy.querySelector('p'), eyebrow:copy.querySelector('.eyebrow'),trust:[...copy.children].at(-1),financeButton:copy.querySelector('a[href="/finance"]'),logisticsButton:copy.querySelector('a[href="/logistics"]'),financeLabel:copy.querySelector('a[href="/finance"] .btn-arrow-label'),logisticsLabel:copy.querySelector('a[href="/logistics"] .btn-arrow-label')};
  const typography = Object.fromEntries(Object.entries(els).map(([key,el]) => {const s=getComputedStyle(el);const r=el.getBoundingClientRect();return [key,{text:el.innerText,fontFamily:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,fontWeight:s.fontWeight,letterSpacing:s.letterSpacing,color:s.color,width:r.width,height:r.height}]}));
  return {typography,links:[...copy.querySelectorAll('a')].map(el=>({text:el.innerText,href:el.getAttribute('href')})),downstream:[...document.querySelector('main').children].filter(el=>el!==hero).map(el=>({html:el.outerHTML,text:el.innerText,tag:el.tagName,id:el.id,heading:el.querySelector('h2,h3')?.innerText||''}))};
}'''
OVERFLOW_JS = '''() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,hero:document.querySelector('.hero-section').getBoundingClientRect().toJSON(),panels:[...document.querySelectorAll('[role="tabpanel"][id^="hero-panel-"]')].map(el=>({id:el.id,active:el.dataset.active,hidden:el.getAttribute('aria-hidden'),visibility:getComputedStyle(el).visibility,rect:el.getBoundingClientRect().toJSON(),visibleFocusable:[...el.querySelectorAll('button,a,input,select,textarea,[tabindex]')].filter(el=>el.tabIndex>=0 && el.checkVisibility({visibilityProperty:true})).map(el=>el.innerText || el.tagName)}))})'''
SHIFT_INIT = '''window.__shifts=[]; new PerformanceObserver(list=>{for(const e of list.getEntries()) window.__shifts.push({value:e.value,time:e.startTime,hadRecentInput:e.hadRecentInput,sources:e.sources.map(s=>({node:s.node?.outerHTML?.slice(0,220),previous:s.previousRect.toJSON(),current:s.currentRect.toJSON()}))})}).observe({type:'layout-shift',buffered:true});'''

def shifts(page):
    entries = page.evaluate('window.__shifts')
    eligible = [entry for entry in entries if not entry['hadRecentInput']]
    maximum = 0
    session = []
    for entry in eligible:
        if session and (entry['time']-session[-1]['time'] > 1000 or entry['time']-session[0]['time'] > 5000):
            maximum = max(maximum, sum(item['value'] for item in session))
            session = []
        session.append(entry)
    maximum = max(maximum, sum(item['value'] for item in session))
    return {'cls':maximum,'total':sum(item['value'] for item in eligible),'entries':entries}

result = {'url':args.url,'widths':[],'errors':[]}
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=p.chromium.executable_path)
    for width in [320,390,768,1024,1440]:
        page = browser.new_page(viewport={'width':width,'height':1000},device_scale_factor=1,reduced_motion='reduce')
        page.on('pageerror',lambda err:result['errors'].append(str(err)))
        response=page.goto(args.url,wait_until='networkidle',timeout=60000)
        page.evaluate('document.fonts.ready')
        snap=page.evaluate(STYLE_JS)
        row={'width':width,'status':response.status,'initial':page.evaluate(OVERFLOW_JS),'typography':snap['typography'],'links':snap['links'],'tabs':[],'keyboard':[]}
        if width==1440:
            row['typographyDifferences']={key:{prop:{'baseline':baseline['typography'][key][prop],'current':value} for prop,value in style.items() if prop in ['text','fontFamily','fontSize','lineHeight','fontWeight','letterSpacing'] and baseline['typography'][key][prop]!=value} for key,style in snap['typography'].items()}
            row['downstream']=[]
            for index,section in enumerate(snap['downstream']):
                html=section.pop('html')
                section['sha256']=hashlib.sha256(html.encode()).hexdigest()
                section['textSha256']=hashlib.sha256(section['text'].encode()).hexdigest()
                section['htmlMatchesBaseline']=section['sha256']==baseline['downstream'][index]['sha256']
                section['textMatchesBaseline']=section['textSha256']==baseline['downstream'][index]['textSha256']
                (OUT/f'{args.label}-downstream-{index:02d}.html').write_text(html,encoding='utf-8')
                row['downstream'].append(section)
        page.locator('.hero-section').screenshot(path=str(OUT/f'{args.label}-hero-{width}.png'))
        for index in range(3):
            page.locator(f'#hero-tab-{index}').click()
            page.wait_for_timeout(100)
            tab={'index':index,'selected':page.locator(f'#hero-tab-{index}').get_attribute('aria-selected'),'layout':page.evaluate(OVERFLOW_JS)}
            if width in [320,1440]:
                try:
                    page.locator(f'#hero-panel-{index}').screenshot(path=str(OUT/f'{args.label}-panel-{width}-{index}.png'),timeout=3000)
                except Exception as err:
                    tab['screenshotError']=str(err).splitlines()[0]
            tab['hiddenFocusFailures']=page.evaluate('''() => {const failures=[];const tab=document.querySelector('[id^="hero-tab-"][aria-selected="true"]');for(const el of document.querySelectorAll('[id^="hero-panel-"][aria-hidden="true"] button,[id^="hero-panel-"][aria-hidden="true"] a,[id^="hero-panel-"][aria-hidden="true"] [tabindex]')){tab.focus();el.focus();if(document.activeElement===el)failures.push(el.outerHTML.slice(0,180));}return failures;}''')
            row['tabs'].append(tab)
        page.locator('#hero-tab-0').click()
        for key,expected in [('ArrowRight',1),('ArrowRight',2),('ArrowRight',0),('ArrowLeft',2),('Home',0),('End',2)]:
            page.keyboard.press(key)
            row['keyboard'].append({'key':key,'expected':expected,'actual':page.locator('[id^="hero-tab-"][aria-selected="true"]').get_attribute('id'),'focused':page.evaluate('document.activeElement.id')})
        result['widths'].append(row)
        (OUT/f'{args.label}-qa.json').write_text(json.dumps(result,indent=2,ensure_ascii=False),encoding='utf-8')
        page.close()
        print(f'{width}px: overflow={row["initial"]["overflow"]}; tabs and keyboard checked',flush=True)
    motion=[]
    for reduced in ['no-preference','reduce']:
        page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1,reduced_motion=reduced)
        page.on('pageerror',lambda err:result['errors'].append(str(err)))
        page.add_init_script(SHIFT_INIT)
        page.mouse.move(0,0)
        page.goto(args.url,wait_until='networkidle',timeout=60000)
        motion.append({'page':page,'reduced':reduced,'states':[{'time':0,'tab':page.locator('[id^="hero-tab-"][aria-selected="true"]').get_attribute('id')}]})
    for elapsed,wait in [(8.5,8500),(17,8500),(18.2,1200)]:
        motion[0]['page'].wait_for_timeout(wait)
        for item in motion:
            item['states'].append({'time':elapsed,'tab':item['page'].locator('[id^="hero-tab-"][aria-selected="true"]').get_attribute('id')})
    result['motion']=[]
    for item in motion:
        page=item.pop('page')
        item['layoutShift']=shifts(page)
        item['activeHeroAnimations']=page.evaluate('''() => document.querySelector('.hero-section').getAnimations({subtree:true}).filter(a=>a.playState==='running').map(a=>({name:a.animationName||'',target:a.effect.target?.className}))''')
        result['motion'].append(item)
        page.close()
    browser.close()
(OUT/f'{args.label}-qa.json').write_text(json.dumps(result,indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'errors':result['errors'],'motion':[{'reduced':item['reduced'],'states':item['states'],'cls':item['layoutShift']['cls'],'shiftCount':len(item['layoutShift']['entries']),'activeAnimations':len(item['activeHeroAnimations'])} for item in result['motion']]},indent=2))
