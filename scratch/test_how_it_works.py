from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000/finance-desk/invoice-automation/', wait_until='networkidle')
    page.wait_for_timeout(400)
    
    section = page.locator('#how-it-works')
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    section.screenshot(path='scratch/invoice_how_it_works_tab1.png')
    
    # Click Tab 2: Extract
    page.locator('#invoice-tab-1').click()
    page.wait_for_timeout(300)
    section.screenshot(path='scratch/invoice_how_it_works_tab2.png')
    
    # Click Tab 3: Review
    page.locator('#invoice-tab-2').click()
    page.wait_for_timeout(300)
    section.screenshot(path='scratch/invoice_how_it_works_tab3.png')
    
    # Click Tab 4: Post
    page.locator('#invoice-tab-3').click()
    page.wait_for_timeout(300)
    section.screenshot(path='scratch/invoice_how_it_works_tab4.png')
    
    browser.close()
print('All How It Works screenshots captured')
