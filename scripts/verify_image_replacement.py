import os
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT_DIR = Path(r"C:\Users\vasan\.gemini\antigravity\brain\7a2c7add-7793-4285-a910-cef7ebe37eb2")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://localhost:3000"

def verify():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        # 1. Homepage at 1440px
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Check left section: 2-min demo video slot should NOT exist
        demo_btn = page.locator("text='Watch 2-Min Demo'")
        assert demo_btn.count() == 0, "Watch 2-Min Demo button should be removed from left column!"
        print("PASS: Watch 2-Min Demo removed from left section")

        # Check right panel: Walkthrough tab (Tab 3) should still exist
        walkthrough_tab = page.locator("button:has-text('2-Min Walkthrough')")
        assert walkthrough_tab.count() > 0, "Tab 3: 2-Min Walkthrough in right panel must remain!"
        print("PASS: Right panel 2-Min Walkthrough tab remains intact")

        # Screenshot Homepage Hero
        page.screenshot(path=str(OUT_DIR / "homepage_hero_no_left_demo_1440.png"))
        print(f"Captured: {OUT_DIR / 'homepage_hero_no_left_demo_1440.png'}")

        # 2. Finance Page at 1440px
        page.goto(f"{BASE_URL}/finance", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Verify finance desk image exists and loads
        finance_img = page.locator("img[src*='finance-desk-card.jpg']")
        print(f"Finance desk image count on /finance: {finance_img.count()}")
        assert finance_img.count() >= 1, "Finance page must render finance-desk-card.jpg!"
        # Verify no video tag inside the hero showcase
        finance_hero_video = page.locator(".finance-hero video")
        assert finance_hero_video.count() == 0, "Finance hero must not render a video element!"
        print("PASS: Finance page renders professional desk image and no video element")

        page.screenshot(path=str(OUT_DIR / "finance_page_image_showcase_1440.png"))
        print(f"Captured: {OUT_DIR / 'finance_page_image_showcase_1440.png'}")

        # 3. Logistics Page at 1440px
        page.goto(f"{BASE_URL}/logistics", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Verify logistics desk image exists and loads
        logistics_img = page.locator("img[src*='logistics-desk-card.jpg']")
        print(f"Logistics desk image count on /logistics: {logistics_img.count()}")
        assert logistics_img.count() >= 1, "Logistics page must render logistics-desk-card.jpg!"
        logistics_hero_video = page.locator(".logistics-hero video")
        assert logistics_hero_video.count() == 0, "Logistics hero must not render a video element!"
        print("PASS: Logistics page renders professional desk image and no video element")

        page.screenshot(path=str(OUT_DIR / "logistics_page_image_showcase_1440.png"))
        print(f"Captured: {OUT_DIR / 'logistics_page_image_showcase_1440.png'}")

        # 4. Mobile 390px viewports
        page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
        page_mobile.goto(f"{BASE_URL}/finance", wait_until="networkidle")
        page_mobile.wait_for_timeout(500)
        page_mobile.screenshot(path=str(OUT_DIR / "finance_page_mobile_390.png"))

        page_mobile.goto(f"{BASE_URL}/logistics", wait_until="networkidle")
        page_mobile.wait_for_timeout(500)
        page_mobile.screenshot(path=str(OUT_DIR / "logistics_page_mobile_390.png"))

        browser.close()
        print("\nALL CHECKS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    verify()
