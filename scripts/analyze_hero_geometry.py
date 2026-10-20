from playwright.sync_api import sync_playwright
import json

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def analyze_hero():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        page.goto("http://localhost:3000/", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Inspect Hero DOM and bounding rectangles
        data = page.evaluate("""() => {
            const heroSection = document.querySelector('.hero-section');
            const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
            const heroComputed = heroSection ? window.getComputedStyle(heroSection) : null;

            // Background layers inside hero
            const bgContainer = heroSection ? heroSection.querySelector('div[aria-hidden="true"]') : null;
            const bgGlow = bgContainer ? bgContainer.children[0] : null;
            const bgGrid = bgContainer ? bgContainer.children[1] : null;

            const leftCol = document.querySelector('.hero-section .site-shell > div:first-child');
            const leftColRect = leftCol ? leftCol.getBoundingClientRect() : null;
            const leftColComputed = leftCol ? window.getComputedStyle(leftCol) : null;

            const leftTextWrapper = leftCol ? leftCol.querySelector('div.max-w-\\\\[580px\\\\]') : null;
            const leftTextRect = leftTextWrapper ? leftTextWrapper.getBoundingClientRect() : null;

            const rightCol = document.querySelector('.hero-section .site-shell > div:last-child');
            const rightColRect = rightCol ? rightCol.getBoundingClientRect() : null;
            const rightColComputed = rightCol ? window.getComputedStyle(rightCol) : null;

            const productPanel = document.querySelector('#hero-product-panel') || document.querySelector('.hero-section .site-shell > div:last-child > div');
            const productPanelRect = productPanel ? productPanel.getBoundingClientRect() : null;

            const siteShell = document.querySelector('.hero-section .site-shell');
            const siteShellRect = siteShell ? siteShell.getBoundingClientRect() : null;

            const vpWidth = window.innerWidth;
            const vpHeight = window.innerHeight;

            return {
                viewport: { width: vpWidth, height: vpHeight },
                heroSection: {
                    rect: heroRect,
                    scrollHeight: heroSection ? heroSection.scrollHeight : 0,
                    offsetHeight: heroSection ? heroSection.offsetHeight : 0,
                    zIndex: heroComputed ? heroComputed.zIndex : 'auto',
                    position: heroComputed ? heroComputed.position : '',
                    overflow: heroComputed ? heroComputed.overflow : ''
                },
                bgLayers: {
                    containerZIndex: bgContainer ? window.getComputedStyle(bgContainer).zIndex : null,
                    glowZIndex: bgGlow ? window.getComputedStyle(bgGlow).zIndex : null,
                    gridZIndex: bgGrid ? window.getComputedStyle(bgGrid).zIndex : null,
                    glowClass: bgGlow ? bgGlow.className : null,
                    gridClass: bgGrid ? bgGrid.className : null
                },
                siteShell: {
                    rect: siteShellRect,
                    zIndex: siteShell ? window.getComputedStyle(siteShell).zIndex : null
                },
                leftCol: {
                    rect: leftColRect,
                    textRect: leftTextRect,
                    zIndex: leftColComputed ? leftColComputed.zIndex : null,
                    position: leftColComputed ? leftColComputed.position : null,
                    top: leftColComputed ? leftColComputed.top : null,
                    height: leftColComputed ? leftColComputed.height : null
                },
                rightCol: {
                    rect: rightColRect,
                    panelRect: productPanelRect,
                    zIndex: rightColComputed ? rightColComputed.zIndex : null
                }
            };
        }""")

        browser.close()
        print(json.dumps(data, indent=2))

if __name__ == "__main__":
    analyze_hero()
