from pathlib import Path
from urllib.parse import urlparse, unquote
import json
from playwright.sync_api import sync_playwright

OUT=Path('scratch/finance-build-qa'); OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:3106'
slugs=['','invoice-automation/','banking-reconciliation/','payment-reminders/','accounts-payable/','docsynecx-intelligence/']
report={'pages':[],'checks':[],'errors':[]}
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',headless=True)
    context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
    page=context.new_page()
    page.on('pageerror',lambda error:report['errors'].append(str(error)))
    for slug in slugs:
        response=page.goto(BASE+'/finance-desk/'+slug,wait_until='networkidle')
        assert response.status==200,(slug,response.status)
        assert page.locator('h1').count()==1,slug
        assert page.locator('footer nav[aria-label="Finance Desk footer links"] a').count()==6
        assert 'Docsynecx' in page.title()
        item={'slug':slug or 'overview','title':page.title(),'sizes':[]}
        for width in [1440,768,390,320]:
            page.set_viewport_size({'width':width,'height':1000})
            page.wait_for_timeout(100)
            metrics=page.evaluate('''() => ({width:innerWidth,scroll:document.documentElement.scrollWidth,font:getComputedStyle(document.body).fontFamily,brand:getComputedStyle(document.documentElement).getPropertyValue('--color-brand'),overflow:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left < -1)}).slice(0,8).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,70)}))})''')
            item['sizes'].append(metrics)
            assert metrics['scroll']<=width+1,(slug,width,metrics)
            if width in [1440,390]:
                page.screenshot(path=str(OUT/f'{slug.strip("/") or "overview"}-{width}.png'),full_page=True)
        links=page.locator('a[href]').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))')
        for href in links:
            if not href.startswith('/') and not href.startswith('#'): continue
            url=urlparse(href)
            target=Path('out')/url.path.strip('/')/'index.html' if url.path else Path('out/finance-desk')/slug/'index.html'
            if not target.exists(): raise AssertionError((slug,'missing link',href,str(target)))
            if url.fragment:
                html=target.read_text(encoding='utf-8')
                assert f'id="{unquote(url.fragment)}"' in html,(slug,'missing anchor',href)
        report['pages'].append(item)
    page.set_viewport_size({'width':1440,'height':1000})
    page.goto(BASE+'/finance-desk/invoice-automation/',wait_until='networkidle')
    page.get_by_role('link',name='Finance Desk',exact=True).hover()
    page.get_by_role('link',name='01 Invoice Automation').wait_for(state='visible')
    assert page.get_by_role('link',name='01 Invoice Automation').get_attribute('aria-current')=='page'
    page.get_by_role('button',name='Finance Desk capabilities').focus()
    page.keyboard.press('Escape')
    assert page.get_by_role('button',name='Finance Desk capabilities').get_attribute('aria-expanded')=='false'
    page.get_by_role('button',name='Finance Desk capabilities').click()
    page.get_by_role('link',name='03 Payment Reminders').click()
    page.wait_for_url('**/finance-desk/payment-reminders/')
    assert 'Payment Reminders' in page.locator('h1').inner_text()
    report['checks'].append('Desktop hover, active state, Escape and client navigation')
    page.set_viewport_size({'width':390,'height':844})
    page.get_by_role('button',name='Open navigation',exact=True).click()
    page.get_by_role('button',name='Finance Desk capabilities').click()
    page.get_by_role('link',name='04 Accounts Payable Upcoming').click()
    page.wait_for_url('**/finance-desk/accounts-payable/')
    assert page.get_by_role('button',name='Open navigation',exact=True).is_visible()
    page.get_by_role('link',name='Register Your Interest',exact=False).click()
    assert page.locator('#register-interest').is_visible()
    report['checks'].append('Mobile navigation and register-interest anchor')
    page.goto(BASE+'/finance-desk/docsynecx-intelligence/',wait_until='networkidle')
    assert page.locator('main details').count()==6
    for detail in page.locator('main details').all():
        detail.locator('summary').click()
        assert detail.get_attribute('open') is not None
        detail.locator('summary').click()
        assert detail.get_attribute('open') is None
    report['checks'].append('All six Intelligence disclosures open and close')
    page.goto(BASE+'/finance-desk/',wait_until='networkidle')
    faq=page.get_by_role('button',name='Can we start with only one capability?')
    faq.click(); assert faq.get_attribute('aria-expanded')=='true'
    report['checks'].append('FAQ accordion')
    page.goto(BASE+'/finance-desk/accounts-payable/#register-interest',wait_until='networkidle')
    captured=[]
    def reject(route):
        captured.append(route.request.post_data_json)
        route.fulfill(status=500,content_type='application/json',body='{"message":"Test failure"}')
    page.route('**/rest/v1/contact_submissions',reject)
    page.get_by_label('Work email',exact=True).fill('qa@example.com')
    page.get_by_label('Company',exact=True).fill('QA test only')
    page.get_by_label('What would you like to improve?',exact=True).fill('Supplier approvals')
    page.get_by_role('button',name='Register interest',exact=True).click()
    page.get_by_role('status').filter(has_text='Something went wrong').wait_for()
    assert page.get_by_label('Work email',exact=True).input_value()=='qa@example.com'
    assert 'Accounts Payable interest' in captured[0]['message']
    page.unroute('**/rest/v1/contact_submissions',reject)
    page.route('**/rest/v1/contact_submissions',lambda route:route.fulfill(status=201,content_type='application/json',body=''))
    page.get_by_role('button',name='Register interest',exact=True).click()
    page.get_by_role('status').filter(has_text='Thanks').wait_for()
    assert page.get_by_label('Work email',exact=True).input_value()==''
    report['checks'].append('Interest form failure preserves data; success clears form; submissions mocked')
    browser.close()
(OUT/'report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(report['pages']),'checks':report['checks'],'errors':report['errors']}))
assert not report['errors'],report['errors']
