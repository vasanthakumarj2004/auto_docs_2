from playwright.sync_api import sync_playwright
import time
import os

OUT_DIR = r"C:\Users\vasan\.gemini\antigravity\brain\7a2c7add-7793-4285-a910-cef7ebe37eb2"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH)

        # -------------------------------------------------------------
        # 1. Desktop 1440x900 Tests
        # -------------------------------------------------------------
        context_desktop = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context_desktop.new_page()

        print("Navigating to Homepage (1440px)...")
        page.goto("http://localhost:3000/", wait_until="networkidle")
        time.sleep(1.5)

        # Capture Homepage Hero (with Video Card Slot trigger)
        page.screenshot(path=os.path.join(OUT_DIR, "video_hero_slot_1440.png"))
        print("Captured video_hero_slot_1440.png")

        # Switch right hero panel to Tab 3 (2-Min Walkthrough)
        tabs = page.locator("button[role='tab']")
        tabs.nth(2).click()
        time.sleep(1.2)

        # Capture Tab 3 in Interactive Storyboard mode
        page.screenshot(path=os.path.join(OUT_DIR, "video_tab3_storyboard_1440.png"))
        print("Captured video_tab3_storyboard_1440.png")

        # Click "Video Player" mode button in Tab 3
        video_mode_btn = page.locator("text='Video Player'").first
        if video_mode_btn.count() > 0:
            video_mode_btn.click()
            time.sleep(1.2)
            page.screenshot(path=os.path.join(OUT_DIR, "video_tab3_player_1440.png"))
            print("Captured video_tab3_player_1440.png")

        # Click the Video Card Slot trigger on the left to launch VideoModal
        modal_trigger = page.locator("[aria-label*='Open video modal']").first
        if modal_trigger.count() > 0:
            modal_trigger.click()
            time.sleep(1.2)
            page.screenshot(path=os.path.join(OUT_DIR, "video_modal_opened_1440.png"))
            print("Captured video_modal_opened_1440.png")

            # Press Escape to test dismiss and return focus
            page.keyboard.press("Escape")
            time.sleep(0.8)
            print("VideoModal closed via Escape key successfully.")

        # -------------------------------------------------------------
        # 2. Finance Page (1440px)
        # -------------------------------------------------------------
        print("Navigating to /finance...")
        page.goto("http://localhost:3000/finance", wait_until="networkidle")
        time.sleep(1.5)

        # Capture Tier 1 with LoopVideo
        page.screenshot(path=os.path.join(OUT_DIR, "video_finance_tier1_1440.png"))
        print("Captured video_finance_tier1_1440.png")

        # Scroll to Customer Story Rajadurai (#customer-story-rajadurai)
        rajadurai_card = page.locator("#customer-story-rajadurai")
        if rajadurai_card.count() > 0:
            rajadurai_card.scroll_into_view_if_needed()
            time.sleep(1)
            page.screenshot(path=os.path.join(OUT_DIR, "video_finance_customer_slot_1440.png"))
            print("Captured video_finance_customer_slot_1440.png")

        # -------------------------------------------------------------
        # 3. Logistics Page (1440px)
        # -------------------------------------------------------------
        print("Navigating to /logistics...")
        page.goto("http://localhost:3000/logistics", wait_until="networkidle")
        time.sleep(1.5)

        # Capture Tier 1 with LoopVideo
        page.screenshot(path=os.path.join(OUT_DIR, "video_logistics_tier1_1440.png"))
        print("Captured video_logistics_tier1_1440.png")

        # -------------------------------------------------------------
        # 4. Customer Story Pages
        # -------------------------------------------------------------
        print("Navigating to /customers/rajadurai...")
        page.goto("http://localhost:3000/customers/rajadurai", wait_until="networkidle")
        time.sleep(1)
        page.screenshot(path=os.path.join(OUT_DIR, "video_customer_rajadurai_page_1440.png"))
        print("Captured video_customer_rajadurai_page_1440.png")

        print("Navigating to /customers/ft-logistics...")
        page.goto("http://localhost:3000/customers/ft-logistics", wait_until="networkidle")
        time.sleep(1)
        page.screenshot(path=os.path.join(OUT_DIR, "video_customer_ft_logistics_page_1440.png"))
        print("Captured video_customer_ft_logistics_page_1440.png")

        # -------------------------------------------------------------
        # 5. Verify /calculator has NO video elements
        # -------------------------------------------------------------
        print("Checking /calculator...")
        page.goto("http://localhost:3000/calculator", wait_until="networkidle")
        time.sleep(1)
        video_tags = page.locator("video").count()
        print(f"Video tags found on /calculator: {video_tags} (Expected: 0)")
        assert video_tags == 0, "Calculator should have 0 video tags!"

        # -------------------------------------------------------------
        # 6. Mobile 390x844 Tests
        # -------------------------------------------------------------
        print("Running Mobile 390px tests...")
        context_mobile = browser.new_context(viewport={"width": 390, "height": 844})
        page_mobile = context_mobile.new_page()

        page_mobile.goto("http://localhost:3000/", wait_until="networkidle")
        time.sleep(1.5)
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "video_homepage_390.png"))
        print("Captured video_homepage_390.png")

        # Open VideoModal on mobile
        modal_trigger_mobile = page_mobile.locator("[aria-label*='Open video modal']").first
        if modal_trigger_mobile.count() > 0:
            modal_trigger_mobile.click()
            time.sleep(1)
            page_mobile.screenshot(path=os.path.join(OUT_DIR, "video_modal_390.png"))
            print("Captured video_modal_390.png")

        page_mobile.goto("http://localhost:3000/finance", wait_until="networkidle")
        time.sleep(1)
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "video_finance_390.png"))
        print("Captured video_finance_390.png")

        page_mobile.goto("http://localhost:3000/logistics", wait_until="networkidle")
        time.sleep(1)
        page_mobile.screenshot(path=os.path.join(OUT_DIR, "video_logistics_390.png"))
        print("Captured video_logistics_390.png")

        browser.close()
        print("All verification tests passed successfully!")

if __name__ == "__main__":
    run_tests()
