from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge')
    page=browser.new_page(viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://localhost:3000/finance/',wait_until='networkidle')
    section=page.locator('#finance-workflow')
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    heights={}
    for width in [1440,1024,768,390,320]:
        page.set_viewport_size({'width':width,'height':1000})
        heights[width]=[]
        for i in range(4):
            tab=section.locator('#workflow-tab-'+str(i))
            tab.click()
            page.wait_for_timeout(550)
            panel=section.locator('#workflow-panel-'+str(i))
            assert panel.is_visible()
            assert section.locator('[role=tabpanel]:visible').count()==1
            assert tab.get_attribute('aria-selected')=='true'
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),'overflow '+str(width)
            assert panel.evaluate('(e)=>e.scrollWidth<=e.clientWidth+1'),'panel overflow '+str(width)
            heights[width].append(panel.bounding_box()['height'])
            if width==1440:
                section.screenshot(path='scratch/workflow-desktop-'+str(i)+'.png')
        if width in [768,390]:
            section.screenshot(path='scratch/workflow-'+str(width)+'.png')
    section.locator('#workflow-tab-3').focus()
    page.keyboard.press('Home')
    assert section.locator('#workflow-tab-0').get_attribute('aria-selected')=='true'
    page.keyboard.press('ArrowDown')
    assert section.locator('#workflow-tab-1').get_attribute('aria-selected')=='true'
    page.keyboard.press('End')
    assert section.locator('#workflow-tab-3').get_attribute('aria-selected')=='true'
    page.keyboard.press('ArrowRight')
    assert section.locator('#workflow-tab-0').get_attribute('aria-selected')=='true'
    page.emulate_media(reduced_motion='reduce')
    section.locator('#workflow-tab-3').click()
    assert section.locator('#workflow-panel-3 > div').evaluate('(e)=>getComputedStyle(e).animationName')=='none'
    font=section.locator('h2').evaluate('(e)=>getComputedStyle(e).fontFamily')
    assert 'Plus Jakarta Sans' in font
    page.goto('http://localhost:3000/finance-desk/',wait_until='networkidle')
    assert page.locator('#finance-workflow').count()==1
    print(json.dumps({'responsive':'passed','keyboard':'passed','reduced_motion':'passed','font':font,'routes':'passed','panel_heights':heights,'page_errors':errors}))
    browser.close()
