from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    page.goto("http://localhost:3000/finance/", wait_until="networkidle")
    
    # Check current styles
    res = page.evaluate("""() => {
        const wrapper = document.querySelector('.hero-desk-sticky-wrapper');
        const textBlock = document.querySelector('.hero-desk-text-block');
        const grid = wrapper.parentElement;
        const rightCol = grid.children[1];
        
        return {
            wrapperH: wrapper.getBoundingClientRect().height,
            rightH: rightCol.getBoundingClientRect().height,
            gridH: grid.getBoundingClientRect().height
        };
    }""")
    print("Initial:", res)
    
    # Try: what if wrapper has align-self: stretch (or grid doesn't have wrapper forcing 1000px)?
    page.evaluate("""() => {
        const style = document.createElement('style');
        style.id = 'test-style';
        style.textContent = `
            .test-wrapper {
                align-self: stretch !important;
                height: 100% !important;
                position: relative !important;
            }
            .test-block {
                position: sticky !important;
                top: calc(50svh + 40px) !important;
                transform: translateY(-50%) !important;
            }
        `;
        document.head.appendChild(style);
        
        const wrapper = document.querySelector('.hero-desk-sticky-wrapper');
        wrapper.classList.add('test-wrapper');
        const textBlock = document.querySelector('.hero-desk-text-block');
        textBlock.classList.add('test-block');
    }""")
    
    res2 = page.evaluate("""() => {
        const wrapper = document.querySelector('.hero-desk-sticky-wrapper');
        const textBlock = document.querySelector('.hero-desk-text-block');
        const grid = wrapper.parentElement;
        const rightCol = grid.children[1];
        
        return {
            wrapperH: wrapper.getBoundingClientRect().height,
            rightH: rightCol.getBoundingClientRect().height,
            gridH: grid.getBoundingClientRect().height,
            blockY: textBlock.getBoundingClientRect().y,
            blockH: textBlock.getBoundingClientRect().height
        };
    }""")
    print("After test style:", res2)
    
    browser.close()
