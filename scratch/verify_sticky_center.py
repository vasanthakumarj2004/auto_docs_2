import json
import time
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
VIEWPORTS = [
    {"width": 1920, "height": 1080, "name": "1920x1080"},
    {"width": 1440, "height": 900, "name": "1440x900"},
    {"width": 1366, "height": 768, "name": "1366x768"},
    {"width": 1280, "height": 720, "name": "1280x720"},
    {"width": 1024, "height": 768, "name": "1024x768"},
]

def run_verification():
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        for vp in VIEWPORTS:
            for page_name in ["finance", "logistics"]:
                page = browser.new_page(viewport={"width": vp["width"], "height": vp["height"]})
                page.goto(f"http://localhost:3000/{page_name}/", wait_until="networkidle")
                page.wait_for_timeout(300)
                
                # Elements
                header = page.locator("header").first
                hero_section = page.locator("section").first
                left_wrapper = page.locator(".hero-desk-sticky-wrapper").first
                left_block = page.locator(".hero-desk-text-block").first
                right_card = page.locator("section .site-shell .lg\\:col-span-5 > div").first
                site_shell = page.locator("section .site-shell").first
                
                nav_h = header.bounding_box()["height"]
                target_center = nav_h + (vp["height"] - nav_h) / 2.0
                
                # Check gutters
                shell_box = site_shell.bounding_box()
                left_gutter = shell_box["x"]
                right_gutter = vp["width"] - (shell_box["x"] + shell_box["width"])
                gutter_diff = abs(left_gutter - right_gutter)
                
                # Initial right card top
                rc_initial_top = right_card.bounding_box()["y"]
                
                # Measure 3 scroll positions:
                # 1. scrollY = 0
                box_left_0 = left_block.bounding_box()
                center_0 = box_left_0["y"] + box_left_0["height"] / 2.0
                delta_0 = abs(center_0 - target_center)
                
                # 2. Middle of right card scroll
                rc_height = right_card.bounding_box()["height"]
                scroll_mid = rc_height / 2.0
                page.evaluate(f"window.scrollTo(0, {scroll_mid})")
                page.wait_for_timeout(200)
                box_left_mid = left_block.bounding_box()
                center_mid = box_left_mid["y"] + box_left_mid["height"] / 2.0
                delta_mid = abs(center_mid - target_center)
                
                # 3. Near end of hero before unpinning
                # Grid bottom:
                grid_box = page.locator("section .site-shell .grid").first.bounding_box()
                # Scroll to where sticky is still pinned (e.g. scroll_mid + 100 or when right card bottom approaches)
                scroll_end_pinned = max(0, min(scroll_mid + 120, rc_height - 100))
                page.evaluate(f"window.scrollTo(0, {scroll_end_pinned})")
                page.wait_for_timeout(200)
                box_left_end = left_block.bounding_box()
                center_end = box_left_end["y"] + box_left_end["height"] / 2.0
                delta_end = abs(center_end - target_center)
                
                # Check unpin when scrolled far down past hero
                page.evaluate("window.scrollTo(0, 1200)")
                page.wait_for_timeout(200)
                box_left_unpinned = left_block.bounding_box()
                
                # Check horizontal scroll
                has_h_scroll = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
                
                res = {
                    "viewport": vp["name"],
                    "page": page_name,
                    "target_center": target_center,
                    "scrollY_0": {
                        "y": box_left_0["y"],
                        "height": box_left_0["height"],
                        "center": center_0,
                        "delta": delta_0,
                    },
                    "scrollY_mid": {
                        "scrollY": scroll_mid,
                        "y": box_left_mid["y"],
                        "center": center_mid,
                        "delta": delta_mid,
                    },
                    "scrollY_pinned_end": {
                        "scrollY": scroll_end_pinned,
                        "y": box_left_end["y"],
                        "center": center_end,
                        "delta": delta_end,
                    },
                    "unpinned_y_at_1200": box_left_unpinned["y"],
                    "right_card_top": rc_initial_top,
                    "left_gutter": left_gutter,
                    "right_gutter": right_gutter,
                    "gutter_diff": gutter_diff,
                    "has_h_scroll": has_h_scroll
                }
                results.append(res)
                page.close()
                
        # Also test short screen fallback at 1280x500
        for page_name in ["finance", "logistics"]:
            page = browser.new_page(viewport={"width": 1280, "height": 500})
            page.goto(f"http://localhost:3000/{page_name}/", wait_until="networkidle")
            page.wait_for_timeout(300)
            
            box_short = page.locator(".hero-desk-text-block").first.bounding_box()
            header_h = page.locator("header").first.bounding_box()["height"]
            
            # Should be top-aligned at 80 + 40 = 120px
            results.append({
                "viewport": "1280x500 (SHORT FALLBACK)",
                "page": page_name,
                "y": box_short["y"],
                "target_top": header_h + 40,
                "diff_from_target_top": abs(box_short["y"] - (header_h + 40))
            })
            page.close()
            
        browser.close()
        
    print(json.dumps(results, indent=2))
    with open("scratch/verification_results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    run_verification()
