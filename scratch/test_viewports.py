from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page()
    for w, h in [(1920, 1080), (1536, 864), (1440, 900), (1366, 768), (1280, 720), (1024, 768)]:
        page.set_viewport_size({'width': w, 'height': h})
        page.goto('http://localhost:3000/finance/', wait_until='networkidle')
        page.wait_for_timeout(300)
        
        header = page.locator('header').first.bounding_box()
        visual = page.locator('div[aria-label=\'Illustrative product view\']').first.bounding_box()
        copy = page.locator('#finance-title').first.locator('xpath=..').bounding_box()
        
        header_bottom = header['y'] + header['height']
        gap_visual = visual['y'] - header_bottom
        
        visual_center = visual['y'] + visual['height'] / 2
        copy_center = copy['y'] + copy['height'] / 2
        diff_center = copy_center - visual_center
        vy = visual['y']
        
        print(f'{w}x{h}: header_bottom={header_bottom:.1f}, visual_top={vy:.1f}, gap={gap_visual:.1f}, visual_center={visual_center:.1f}, copy_center={copy_center:.1f}, diff_center={diff_center:.1f}')
    browser.close()
