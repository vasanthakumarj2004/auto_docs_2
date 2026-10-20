from playwright.sync_api import sync_playwright
import json

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

URLS = [
    ("Shipsy", "https://www.shipsy.ai"),
    ("Raft Home", "https://raft.ai"),
    ("Raft Platform", "https://raft.ai/platform"),
    ("Raft Freight Forwarding", "https://raft.ai/freight-forwarding"),
    ("Mercury", "https://mercury.com"),
]

def inspect_sites():
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        
        for name, url in URLS:
            print(f"Inspecting {name} ({url})...")
            context = browser.new_context(viewport={"width": 1440, "height": 900})
            page = context.new_page()

            media_requests = []
            page.on("response", lambda res: (
                media_requests.append({
                    "url": res.url,
                    "status": res.status,
                    "contentType": res.headers.get("content-type", ""),
                    "contentLength": res.headers.get("content-length", "")
                }) if any(k in res.headers.get("content-type", "").lower() for k in ["video", "mp4", "webm", "ogg"])
                or any(res.url.lower().endswith(ext) for ext in [".mp4", ".webm", ".mov", ".m4v"])
                else None
            ))

            try:
                page.goto(url, wait_until="networkidle", timeout=25000)
                page.wait_for_timeout(2000)
            except Exception as e:
                print(f"Warning: navigation timeout or partial load on {url}: {e}")

            # Inspect DOM for video, canvas in Hero / header
            dom_data = page.evaluate("""() => {
                const videos = Array.from(document.querySelectorAll('video')).map(v => {
                    const rect = v.getBoundingClientRect();
                    const style = window.getComputedStyle(v);
                    const parentStyle = v.parentElement ? window.getComputedStyle(v.parentElement) : {};
                    return {
                        src: v.src || (v.querySelector('source') ? v.querySelector('source').src : ''),
                        poster: v.poster,
                        autoplay: v.autoplay,
                        loop: v.loop,
                        muted: v.muted,
                        playsInline: v.playsInline,
                        rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
                        zIndex: style.zIndex,
                        position: style.position,
                        mixBlendMode: style.mixBlendMode,
                        opacity: style.opacity,
                        parentZIndex: parentStyle.zIndex,
                        parentMixBlendMode: parentStyle.mixBlendMode,
                        isHeroOrBackground: rect.top < 800 && (rect.width > 500 || style.position === 'absolute' || style.position === 'fixed')
                    };
                });

                const canvases = Array.from(document.querySelectorAll('canvas')).map(c => {
                    const rect = c.getBoundingClientRect();
                    const style = window.getComputedStyle(c);
                    return {
                        rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
                        zIndex: style.zIndex,
                        position: style.position,
                        mixBlendMode: style.mixBlendMode,
                        opacity: style.opacity,
                        isHeroOrBackground: rect.top < 800
                    };
                });

                const heroSection = document.querySelector('header, section:first-of-type, main > div:first-child');
                const heroBgStyle = heroSection ? window.getComputedStyle(heroSection).background : '';

                return {
                    videoCount: videos.length,
                    videos: videos,
                    canvasCount: canvases.length,
                    canvases: canvases,
                    heroBgSnippet: heroBgStyle ? heroBgStyle.slice(0, 150) : ''
                };
            }""")

            results[name] = {
                "url": url,
                "mediaRequests": media_requests,
                "dom": dom_data
            }
            context.close()

        browser.close()

    print("\n--- SUMMARY OF REFERENCE SITES ---")
    print(json.dumps(results, indent=2))
    with open("reference_sites_report.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    inspect_sites()
