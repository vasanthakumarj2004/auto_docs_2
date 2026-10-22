import os
from PIL import Image
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\vasan\.gemini\antigravity\brain\19ca312c-8153-45e2-a9d7-6c893c65af41"

def luminance(r, g, b):
    a = [v / 255.0 for v in [r, g, b]]
    a = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in a]
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722

def contrast_ratio(rgb1, rgb2):
    l1 = luminance(*rgb1)
    l2 = luminance(*rgb2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.wait_for_timeout(500)
    
    text_span = page.locator("text=For businesses that run on Tally").first
    pill_div = text_span.locator("..")
    
    text_color = text_span.evaluate("el => window.getComputedStyle(el).color")
    bg_color = pill_div.evaluate("el => window.getComputedStyle(el).backgroundColor")
    border_color = pill_div.evaluate("el => window.getComputedStyle(el).borderColor")
    
    print("Computed Text Color:", text_color)
    print("Computed BG Color:", bg_color)
    print("Computed Border Color:", border_color)
    
    # Calculate contrast
    # Parse rgb(...)
    import re
    m_text = re.findall(r"\d+", text_color)[:3]
    m_bg = re.findall(r"\d+", bg_color)[:3]
    rgb_text = tuple(int(x) for x in m_text)
    rgb_bg = tuple(int(x) for x in m_bg)
    
    ratio = contrast_ratio(rgb_text, rgb_bg)
    print(f"Text vs Pill BG Contrast Ratio: {ratio:.2f}:1")
    
    # Take screenshot of the whole hero
    hero_path = os.path.join(ARTIFACT_DIR, "hero_tagline_contrast_resolved.png")
    hero_section = page.locator("section").first
    hero_section.screenshot(path=hero_path)
    print(f"Saved {hero_path}")
    
    # Take zoomed screenshot of the pill
    pill_path = os.path.join(ARTIFACT_DIR, "hero_tagline_pill_close_up.png")
    pill_div.screenshot(path=pill_path)
    print(f"Saved {pill_path}")
    
    browser.close()
