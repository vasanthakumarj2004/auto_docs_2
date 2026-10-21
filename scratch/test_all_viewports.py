import json
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

VIEWPORTS = [
    {"name": "1920x1080", "width": 1920, "height": 1080, "is_desktop": True},
    {"name": "1440x900", "width": 1440, "height": 900, "is_desktop": True},
    {"name": "1366x768", "width": 1366, "height": 768, "is_desktop": True},
    {"name": "1280x720", "width": 1280, "height": 720, "is_desktop": True},
    {"name": "1024x768", "width": 1024, "height": 768, "is_desktop": True},
    {"name": "768x1024 (Tablet)", "width": 768, "height": 1024, "is_desktop": False},
    {"name": "390x844 (Mobile)", "width": 390, "height": 844, "is_desktop": False},
    {"name": "1280x500 (Short Fallback)", "width": 1280, "height": 500, "is_desktop": True, "is_short": True},
]

def verify_all():
    records = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        for vp in VIEWPORTS:
            for page_name in ["finance", "logistics"]:
                page = browser.new_page(viewport={"width": vp["width"], "height": vp["height"]})
                page.goto(f"http://localhost:3000/{page_name}/", wait_until="networkidle")
                page.wait_for_timeout(300)
                
                header = page.locator("header").first
                nav_h = header.bounding_box()["height"]
                site_shell = page.locator("section .site-shell").first
                left_block = page.locator(".hero-desk-text-block").first
                right_card = page.locator("section .site-shell .lg\\:col-span-5 > div").first
                
                # Gutter calculation
                shell_box = site_shell.bounding_box()
                left_gutter = shell_box["x"]
                right_gutter = vp["width"] - (shell_box["x"] + shell_box["width"])
                gutter_diff = round(abs(left_gutter - right_gutter), 2)
                
                # Check horizontal scroll
                has_h_scroll = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
                
                # Check initial right card top
                rc_top = round(right_card.bounding_box()["y"], 2)
                
                # Initial left block position
                lb_box_0 = left_block.bounding_box()
                lb_top_0 = round(lb_box_0["y"], 2)
                lb_height = round(lb_box_0["height"], 2)
                lb_center_0 = round(lb_top_0 + lb_height / 2.0, 2)
                
                target_center = round(nav_h + (vp["height"] - nav_h) / 2.0, 2)
                delta_0 = round(abs(lb_center_0 - target_center), 2)
                
                record = {
                    "viewport": vp["name"],
                    "page": page_name,
                    "nav_h": nav_h,
                    "target_center": target_center,
                    "left_block_height": lb_height,
                    "left_block_top_0": lb_top_0,
                    "left_block_center_0": lb_center_0,
                    "delta_0": delta_0,
                    "right_card_top": rc_top,
                    "left_gutter": round(left_gutter, 2),
                    "right_gutter": round(right_gutter, 2),
                    "gutter_diff": gutter_diff,
                    "has_h_scroll": has_h_scroll,
                }
                
                if vp.get("is_short"):
                    # For short screen fallback, check top alignment at nav_h + 40 = 120px
                    target_top = nav_h + 40
                    diff_top = round(abs(lb_top_0 - target_top), 2)
                    record["short_fallback_target_top"] = target_top
                    record["short_fallback_diff"] = diff_top
                    record["short_fallback_passed"] = diff_top <= 1.0
                
                # Scroll check (unpin cleanly past hero)
                page.evaluate("window.scrollTo(0, 1000)")
                page.wait_for_timeout(200)
                lb_box_1000 = left_block.bounding_box()
                record["unpinned_y_at_1000"] = round(lb_box_1000["y"], 2)
                record["unpinned_cleanly"] = lb_box_1000["y"] < 80  # scrolled up past navbar, unpinned smoothly
                
                records.append(record)
                page.close()
                
        browser.close()
        
    print(json.dumps(records, indent=2))
    with open("scratch/all_viewports_results.json", "w") as f:
        json.dump(records, f, indent=2)

if __name__ == "__main__":
    verify_all()
