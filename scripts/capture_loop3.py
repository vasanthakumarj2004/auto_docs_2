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
        
        # Click Tab 3: 2-Min Walkthrough
        tab_buttons = page.locator("button[role='tab']")
        tab_buttons.nth(2).click()
        time.sleep(0.5)
        
        # Capture Chapter 0 / 1
        page.screenshot(path=os.path.join(OUT_DIR, "loop3_walkthrough_1440.png"))
        
        # Click Chapter 3: 01:30 Post to verify chapter jumping
        chapter_buttons = page.locator("button[role='tab']")
        # in the walkthrough, chapter tabs are in a tablist
        page.locator("text='01:30 Post'").click()
        time.sleep(0.5)
        page.screenshot(path=os.path.join(OUT_DIR, "loop3_walkthrough_post_1440.png"))
        page.close()
        
        # 390px Mobile
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1)
        
        tab_buttons_m = page_mobile.locator("button[role='tab']")
        tab_buttons_m.nth(2).click()
        time.sleep(0.5)
        
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "loop3_walkthrough_390.png"))
        page_mobile.close()
        
        browser.close()
        print("Loop 3 screenshots captured successfully")

if __name__ == "__main__":
    capture()
