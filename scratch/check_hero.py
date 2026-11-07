from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000/finance/', wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    header = page.locator('header').first.bounding_box()
    hero = page.locator('#finance-title').first.locator('xpath=ancestor::section[1]').bounding_box()
    hero_copy = page.locator('#finance-title').first.locator('xpath=..').bounding_box()
    hero_visual = page.locator('div[aria-label="Illustrative product view"]').first.bounding_box()
    
    print('Header:', json.dumps(header))
    print('Hero:', json.dumps(hero))
    print('HeroCopy:', json.dumps(hero_copy))
    print('HeroVisual:', json.dumps(hero_visual))
    
    page.screenshot(path='scratch/current_finance_hero.png')
    browser.close()
