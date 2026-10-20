from playwright.sync_api import sync_playwright
import time
import os
import glob

OUT_DIR = r"C:\Users\vasan\.gemini\antigravity\brain\7a2c7add-7793-4285-a910-cef7ebe37eb2"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH)
        
        # 1. Desktop Screenshots & Live Interaction Video
        video_dir = os.path.join(OUT_DIR, "video_recordings")
        os.makedirs(video_dir, exist_ok=True)
        
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            record_video_dir=video_dir,
            record_video_size={"width": 1440, "height": 900}
        )
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(2) # observe pipeline animation
        
        # Capture After Tab 1 (Pipeline)
        page.screenshot(path=os.path.join(OUT_DIR, "after_tab1_1440.png"))
        time.sleep(1)
        
        # Switch to Tab 2: Finance Bill Queue
        tabs = page.locator("button[role='tab']")
        tabs.nth(1).click()
        time.sleep(1)
        page.screenshot(path=os.path.join(OUT_DIR, "after_tab2_1440.png"))
        
        # Click row 3 (INV-0021 Prime Components) to open inspection drawer
        rows = page.locator("tbody tr")
        rows.nth(2).click()
        time.sleep(1.2)
        page.screenshot(path=os.path.join(OUT_DIR, "after_drawer_1440.png"))
        
        # Click Approve inside drawer to trigger local state update and toast
        approve_btn = page.locator("text='Approve & Post'")
        if approve_btn.count() > 0:
            approve_btn.click()
            time.sleep(1.2)
            page.screenshot(path=os.path.join(OUT_DIR, "after_approved_toast_1440.png"))
        
        # Close drawer with X button or escape
        close_btn = page.locator("button[aria-label='Close inspection drawer']")
        if close_btn.count() > 0:
            close_btn.click()
            time.sleep(0.8)
            
        # Switch to Tab 3: 2-Min Walkthrough
        tabs.nth(2).click()
        time.sleep(1.2)
        page.screenshot(path=os.path.join(OUT_DIR, "after_tab3_1440.png"))
        
        # Click chapter: Extract
        page.locator("text='00:30 Extract'").click()
        time.sleep(1)
        
        # Click chapter: Check
        page.locator("text='01:00 Check'").click()
        time.sleep(1)
        
        # Click chapter: Post
        page.locator("text='01:30 Post'").click()
        time.sleep(1.5)
        
        page.close()
        context.close()
        
        # 2. Mobile Screenshots (390px)
        context_m = browser.new_context(viewport={"width": 390, "height": 844})
        page_m = context_m.new_page()
        page_m.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1.5)
        
        tabs_m = page_m.locator("button[role='tab']")
        
        # Tab 1 Mobile
        tabs_m.nth(0).click()
        time.sleep(0.5)
        page_m.screenshot(path=os.path.join(OUT_DIR, "after_tab1_390.png"))
        
        # Tab 2 Mobile
        tabs_m.nth(1).click()
        time.sleep(0.5)
        page_m.screenshot(path=os.path.join(OUT_DIR, "after_tab2_390.png"))
        
        # Tab 3 Mobile
        tabs_m.nth(2).click()
        time.sleep(0.5)
        page_m.screenshot(path=os.path.join(OUT_DIR, "after_tab3_390.png"))
        
        page_m.close()
        context_m.close()
        browser.close()
        
        # Locate recorded video
        video_files = glob.glob(os.path.join(video_dir, "*.webm"))
        if video_files:
            final_video_path = os.path.join(OUT_DIR, "hero_interaction_recording.webm")
            if os.path.exists(final_video_path):
                os.remove(final_video_path)
            os.rename(video_files[0], final_video_path)
            print(f"Recorded video saved to: {final_video_path}")
            
        print("Final verification screenshots and recordings completed successfully.")

if __name__ == "__main__":
    run_verification()
