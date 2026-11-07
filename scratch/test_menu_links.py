from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000/', wait_until='networkidle')
    
    finance_desk_btn = page.locator('nav#landing-navigation button:has-text("Finance Desk")')
    finance_desk_btn.hover()
    page.wait_for_timeout(400)
    
    links = page.locator('#landing-mega-menu a[href*="finance"]').evaluate_all('els => els.map(e => ({ text: e.innerText.trim(), href: e.getAttribute("href") }))')
    for l in links:
        print(l)
    browser.close()
