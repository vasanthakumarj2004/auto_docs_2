from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:3000/", wait_until="networkidle")
        page.wait_for_timeout(400)
        
        # 1. Hover on hero button
        hero_btn = page.locator(".desk-button").first
        hero_btn.hover()
        page.wait_for_timeout(200)
        page.screenshot(path="scratch/verify_hero_btn_hover.png")
        
        # 2. Click the corner ThemeSwitcher button
        switcher_btn = page.locator("button[title='Theme Switcher']")
        switcher_btn.click()
        page.wait_for_timeout(200)
        page.screenshot(path="scratch/verify_theme_menu_open.png")
        
        # 3. Switch to Green
        page.locator("button:has-text('Green (Emerald)')").click()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/verify_theme_green.png")
        
        # 4. Switch to Light Green
        page.locator("button:has-text('Light Green (Mint)')").click()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/verify_theme_light_green.png")
        
        # 5. Switch to Red
        page.locator("button:has-text('Red (Crimson)')").click()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/verify_theme_red.png")
        
        # 6. Switch to Blue
        page.locator("button:has-text('Blue (Royal Blue)')").click()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/verify_theme_blue.png")
        
        # 7. Switch to Yellow
        page.locator("button:has-text('Yellow (Amber Gold)')").click()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/verify_theme_yellow.png")
        
        # 8. Switch to Orange
        page.locator("button:has-text('Orange (Sunset)')").click()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/verify_theme_orange.png")
        
        # 9. Switch back to Current Theme and close
        page.locator("button:has-text('Current (Royal Violet)')").click()
        page.wait_for_timeout(300)
        page.locator("button[aria-label='Close theme menu']").click()
        page.wait_for_timeout(200)
        page.screenshot(path="scratch/verify_theme_current.png")
        
        browser.close()
    print("All theme test screenshots successfully captured!")

if __name__ == "__main__":
    run_tests()
