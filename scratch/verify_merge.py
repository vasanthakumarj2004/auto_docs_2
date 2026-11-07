import asyncio
from playwright.async_api import async_playwright

async def main():
    p = await async_playwright().start()
    browser = await p.chromium.launch(
        headless=True,
        executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    )
    page = await browser.new_page(viewport={"width": 1440, "height": 900})
    await page.goto("http://localhost:3000/", wait_until="networkidle")

    # Accept cookie banner
    accept_btn = page.locator("button:has-text('Accept All')")
    if await accept_btn.count() > 0:
        await accept_btn.click()
        await page.wait_for_timeout(300)

    # Testimonials
    slider = page.locator("#customers")
    await slider.scroll_into_view_if_needed()
    await page.wait_for_timeout(600)
    await page.screenshot(path="scratch/merged_landing_testimonials.png")
    print("Testimonials captured!")

    # Closing
    closing = page.locator("#contact")
    await closing.scroll_into_view_if_needed()
    await page.wait_for_timeout(600)
    await page.screenshot(path="scratch/merged_landing_closing.png")
    print("Closing captured!")

    # Navigation dropdown
    await page.goto("http://localhost:3000/", wait_until="networkidle")
    finance_btn = page.locator("button:has-text('Finance Desk')").first
    await finance_btn.click()
    await page.wait_for_timeout(400)
    await page.screenshot(path="scratch/merged_nav_finance.png")
    print("Nav dropdown captured!")

    # Banking page
    await page.goto("http://localhost:3000/finance-desk/banking-reconciliation/", wait_until="networkidle")
    await page.screenshot(path="scratch/merged_banking_page.png")
    print("Banking page captured!")

    # Accounts Payable page
    await page.goto("http://localhost:3000/finance-desk/accounts-payable/", wait_until="networkidle")
    await page.screenshot(path="scratch/merged_payable_page.png")
    print("Payable page captured!")

    await browser.close()
    await p.stop()

asyncio.run(main())
