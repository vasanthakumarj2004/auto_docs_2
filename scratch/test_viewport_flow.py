from playwright.sync_api import sync_playwright
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def test_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto("http://localhost:3000/", wait_until="networkidle")
        
        # Ensure layout=v2 and appearance=dark
        page.evaluate("""() => {
            localStorage.setItem('autodocs-landing-layout', 'v2');
            localStorage.setItem('autodocs-v2-appearance', 'dark');
            localStorage.setItem('v2-viewport-flow-enabled', 'false');
        }""")
        page.reload(wait_until="networkidle")
        time.sleep(0.5)

        # 1. Screenshot initial default (Toggle OFF)
        page.screenshot(path="scratch/verify_flow_01_off_initial.png")
        print("Captured initial default screenshot")

        # 2. Click Viewport Flow button to open panel
        btn = page.locator('button[aria-label="V2 Dark Viewport Flow Switcher"]')
        assert btn.is_visible(), "Viewport flow switcher button should be visible"
        btn.click()
        time.sleep(0.3)
        page.screenshot(path="scratch/verify_flow_02_panel_opened.png")
        print("Captured panel opened screenshot")

        # 3. Toggle Flow ON
        toggle = page.locator('button[role="switch"][aria-label="Toggle full viewport color flow"]')
        toggle.click()
        time.sleep(0.4)
        page.screenshot(path="scratch/verify_flow_03_flow_on_logo.png")
        print("Captured flow ON (Logo green) screenshot")

        # Check font contrast on hero
        hero_title = page.locator("h1#centred-hero-title")
        hero_accent = page.locator('h1#centred-hero-title span[class*="accent"]')
        desc = page.locator('p[class*="description"]').first
        cta = page.locator(".desk-button").first

        accent_color = hero_accent.evaluate("el => window.getComputedStyle(el).color")
        title_color = hero_title.evaluate("el => window.getComputedStyle(el).color")
        desc_color = desc.evaluate("el => window.getComputedStyle(el).color")
        cta_color = cta.evaluate("el => window.getComputedStyle(el).color")
        cta_bg = cta.evaluate("el => window.getComputedStyle(el).backgroundColor")

        print(f"Colors: title={title_color}, accent={accent_color}, desc={desc_color}, cta_color={cta_color}, cta_bg={cta_bg}")

        # 4. Select Royal Blue preset
        blue_preset = page.locator('button:has-text("Blue")')
        if blue_preset.count() > 0:
            blue_preset.first.click()
            time.sleep(0.4)
            page.screenshot(path="scratch/verify_flow_04_flow_blue.png")
            print("Captured blue preset screenshot")

        # 5. Toggle OFF to verify instant reversion
        toggle.click()
        time.sleep(0.4)
        page.screenshot(path="scratch/verify_flow_05_flow_off_reverted.png")
        print("Captured toggle OFF reverted screenshot")

        browser.close()

if __name__ == "__main__":
    test_flow()
