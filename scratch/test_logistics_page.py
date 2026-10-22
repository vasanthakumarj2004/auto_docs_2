from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:3000/logistics/", wait_until="networkidle")
        page.wait_for_timeout(400)
        
        # 1. Capture Hero view
        page.screenshot(path="scratch/logistics_rebuilt_hero.png")
        
        # 2. Hover on hero button
        hero_btn = page.locator("main a:has-text('Book a demo')").first
        hero_btn.scroll_into_view_if_needed()
        hero_btn.hover()
        page.wait_for_timeout(200)
        page.screenshot(path="scratch/logistics_rebuilt_hero_hover.png")
        
        # 3. Scroll to Workbench and test tabs
        page.locator("#logistics-workbench").scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/logistics_rebuilt_workbench_tab0.png")
        
        # Click Tab 1 (Check weight & packing)
        page.locator("#logistics-tab-1").click()
        page.wait_for_timeout(200)
        page.screenshot(path="scratch/logistics_rebuilt_workbench_tab1.png")
        
        # Click Tab 3 (Post to CargoWise)
        page.locator("#logistics-tab-3").click()
        page.wait_for_timeout(200)
        page.screenshot(path="scratch/logistics_rebuilt_workbench_tab3.png")
        
        # 4. Scroll to Customer Story
        page.locator("#customer-story-ft-logistics").scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.screenshot(path="scratch/logistics_rebuilt_customer_story.png")
        
        # 5. Full page screenshot
        page.screenshot(path="scratch/logistics_rebuilt_full.png", full_page=True)
        
        # 6. Mobile viewport
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto("http://localhost:3000/logistics/", wait_until="networkidle")
        page.wait_for_timeout(400)
        page.screenshot(path="scratch/logistics_rebuilt_mobile.png")
        
        browser.close()
    print("All Logistics page test screenshots captured successfully!")

if __name__ == "__main__":
    run_tests()
