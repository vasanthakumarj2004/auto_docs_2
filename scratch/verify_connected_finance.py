from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge')
    page = browser.new_page(viewport={'width':1440,'height':1000}, device_scale_factor=1)
    errors=[]
    page.on('pageerror', lambda error: errors.append(str(error)))
    response=page.goto('http://localhost:3000/finance/', wait_until='networkidle')
    print('status',response.status)
    section=page.locator('#connected-finance-workspace')
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(700)
    section.screenshot(path='scratch/connected-finance-desktop.png')
    for i in range(4):
        page.locator('#finance-step-'+str(i)).click()
        page.wait_for_timeout(800)
        assert page.locator('#finance-preview-'+str(i)).is_visible()
        assert page.locator('[role=tabpanel]:visible').count()==1
        section.screenshot(path='scratch/connected-finance-step-'+str(i)+'.png')
    page.locator('#finance-step-3').focus()
    page.keyboard.press('Home')
    assert page.locator('#finance-step-0').get_attribute('aria-selected')=='true'
    page.keyboard.press('ArrowDown')
    assert page.locator('#finance-step-1').get_attribute('aria-selected')=='true'
    page.keyboard.press('End')
    assert page.locator('#finance-step-3').get_attribute('aria-selected')=='true'
    for width in [390,768,1024]:
        page.set_viewport_size({'width':width,'height':900})
        for i in range(4):
            page.locator('#finance-step-'+str(i)).click()
            page.wait_for_timeout(450)
            assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'overflow at '+str(width)
        section.screenshot(path='scratch/connected-finance-'+str(width)+'.png')
    page.emulate_media(reduced_motion='reduce')
    page.locator('#finance-step-0').click()
    assert page.locator('#finance-preview-0 > div').first.evaluate('(e) => getComputedStyle(e).animationName')=='none'
    page.goto('http://localhost:3000/finance-desk/', wait_until='networkidle')
    assert page.locator('#connected-finance-workspace').count()==1
    print(json.dumps({'tabs':'passed','keyboard':'passed','responsive_widths':[390,768,1024,1440],'reduced_motion':'passed','routes':['/finance/','/finance-desk/'],'page_errors':errors}))
    browser.close()
