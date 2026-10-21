import os
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\vasan\.gemini\antigravity\brain\19ca312c-8153-45e2-a9d7-6c893c65af41"

def capture_media():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        # 1. Desktop Screenshots (1920x1080)
        for page_name in ["finance", "logistics"]:
            page = browser.new_page(viewport={"width": 1920, "height": 1080})
            page.goto(f"http://localhost:3000/{page_name}/", wait_until="networkidle")
            page.wait_for_timeout(400)
            
            shot_path = os.path.join(ARTIFACT_DIR, f"hero_{page_name}_centered_1920x1080.png")
            page.screenshot(path=shot_path)
            print(f"Captured {shot_path}")
            
            # Short screen fallback
            page.set_viewport_size({"width": 1280, "height": 500})
            page.wait_for_timeout(300)
            shot_short = os.path.join(ARTIFACT_DIR, f"hero_{page_name}_short_screen_fallback.png")
            page.screenshot(path=shot_short)
            print(f"Captured {shot_short}")
            
            page.close()
            
        # 2. Capture scroll animation frames for GIF/video
        for page_name in ["finance", "logistics"]:
            page = browser.new_page(viewport={"width": 1440, "height": 900})
            page.goto(f"http://localhost:3000/{page_name}/", wait_until="networkidle")
            page.wait_for_timeout(400)
            
            frames_dir = os.path.join("scratch", f"frames_{page_name}")
            os.makedirs(frames_dir, exist_ok=True)
            
            # Scroll smoothly from 0 to 800 in 20 steps
            for i in range(21):
                sy = int((i / 20.0) * 800)
                page.evaluate(f"window.scrollTo(0, {sy})")
                page.wait_for_timeout(80)
                frame_path = os.path.join(frames_dir, f"frame_{i:03d}.png")
                page.screenshot(path=frame_path)
            
            print(f"Captured scroll frames for {page_name}")
            page.close()
            
        browser.close()

if __name__ == "__main__":
    capture_media()
