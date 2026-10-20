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
        time.sleep(2)
        
        # Capture Desktop Tab 1 (PipelineView)
        page.screenshot(path=os.path.join(OUT_DIR, "loop1_pipeline_1440.png"))
        
        # 390px Mobile
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(2)
        
        # Capture Mobile Tab 1
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "loop1_pipeline_390.png"))
        
        browser.close()
        print("Loop 1 screenshots captured successfully")

if __name__ == "__main__":
    capture()
