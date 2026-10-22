from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

options = [
    {
        "id": "option_A_light_indigo",
        "container_classes": "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0e7ff] border border-blue-300/80 shadow-xs mb-6 w-fit",
        "text_classes": "text-xs sm:text-[13px] font-semibold text-[#1e40af] tracking-tight"
    },
    {
        "id": "option_B_frosted_white",
        "container_classes": "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/90 shadow-sm mb-6 w-fit",
        "text_classes": "text-xs sm:text-[13px] font-bold text-[#1d4ed8] tracking-tight"
    },
    {
        "id": "option_C_pure_white_pill",
        "container_classes": "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm mb-6 w-fit",
        "text_classes": "text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight"
    },
    {
        "id": "option_D_dark_glass_glowing",
        "container_classes": "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/25 shadow-sm mb-6 w-fit",
        "text_classes": "text-xs sm:text-[13px] font-semibold text-white tracking-tight"
    }
]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.wait_for_timeout(400)
    
    for opt in options:
        page.evaluate(f"""() => {{
            const textSpan = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim().startsWith('For businesses that run'));
            if (textSpan) {{
                const pillDiv = textSpan.parentElement;
                pillDiv.className = '{opt["container_classes"]}';
                textSpan.className = '{opt["text_classes"]}';
            }}
        }}""")
        page.wait_for_timeout(100)
        
        # screenshot left hero section
        hero = page.locator("section").first
        hero.screenshot(path=f"scratch/{opt['id']}.png")
        print(f"Captured scratch/{opt['id']}.png")
        
    browser.close()
