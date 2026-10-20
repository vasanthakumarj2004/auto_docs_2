from playwright.sync_api import sync_playwright
import time
import os

OUT_DIR = r"C:\Users\vasan\.gemini\antigravity\brain\7a2c7add-7793-4285-a910-cef7ebe37eb2"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH)
        
        # 1440px Desktop
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1)
        
        # Tab 1: Live Pipeline
        tab_buttons = page.locator("button[role='tab']")
        tab_buttons.nth(0).click()
        time.sleep(0.5)
        page.screenshot(path=os.path.join(OUT_DIR, "before_tab1_1440.png"))
        
        # Tab 2: Finance Bill Queue
        tab_buttons.nth(1).click()
        time.sleep(0.5)
        page.screenshot(path=os.path.join(OUT_DIR, "before_tab2_1440.png"))
        
        # Tab 3: Walkthrough
        tab_buttons.nth(2).click()
        time.sleep(0.5)
        page.screenshot(path=os.path.join(OUT_DIR, "before_tab3_1440.png"))
        page.close()
        
        # 390px Mobile
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1)
        
        tab_buttons_m = page_mobile.locator("button[role='tab']")
        tab_buttons_m.nth(0).click()
        time.sleep(0.5)
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "before_tab1_390.png"))
        
        tab_buttons_m.nth(1).click()
        time.sleep(0.5)
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "before_tab2_390.png"))
        
        tab_buttons_m.nth(2).click()
        time.sleep(0.5)
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "before_tab3_390.png"))
        page_mobile.close()
        
        browser.close()
        print("Baseline screenshots captured successfully")

if __name__ == "__main__":
    capture()
