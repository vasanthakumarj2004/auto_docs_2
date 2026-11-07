from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    slugs = ['finance/', 'finance-desk/', 'finance-desk/invoice-automation/', 'finance-desk/banking-reconciliation/', 'finance-desk/payment-reminders/', 'finance-desk/accounts-payable/', 'finance-desk/docsynecx-intelligence/']
    for slug in slugs:
        page.goto('http://localhost:3000/' + slug, wait_until='networkidle')
        clean_name = slug.replace('/', '_').strip('_')
        page.screenshot(path='scratch/page_' + clean_name + '.png')
        header = page.locator('header').first.bounding_box()
        visual = page.locator('[class*="heroVisual"]').first.bounding_box()
        copy = page.locator('[class*="heroCopy"]').first.bounding_box()
        h_bot = header['y'] + header['height']
        v_top = visual['y'] if visual else 0
        v_h = visual['height'] if visual else 0
        c_top = copy['y'] if copy else 0
        c_h = copy['height'] if copy else 0
        print(slug, 'header_bot:', h_bot, 'visual_top:', v_top, 'visual_h:', v_h, 'copy_top:', c_top, 'copy_h:', c_h)
    browser.close()
