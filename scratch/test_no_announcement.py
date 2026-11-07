from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width': 1024, 'height': 500})
    page.goto('http://localhost:3000/finance/', wait_until='networkidle')
    page.evaluate('sessionStorage.setItem(\"docsynecx-announcement-v3-dismissed\", \"true\")')
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(300)
    page.screenshot(path='scratch/viewport_1024_500_no_announcement.png')
    
    header = page.locator('header').first.bounding_box()
    visual = page.locator('[class*="heroVisual"]').first.bounding_box()
    copy = page.locator('[class*="heroCopy"]').first.bounding_box()
    hero = page.locator('#finance-title').first.locator('xpath=ancestor::section[1]').bounding_box()
    
    print('Header:', header)
    print('Hero:', hero)
    print('Visual:', visual)
    print('Copy:', copy)
    browser.close()
