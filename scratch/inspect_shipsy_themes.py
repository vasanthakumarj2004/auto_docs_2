from playwright.sync_api import sync_playwright
import json
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch(channel='msedge')
    page=b.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
    page.goto('https://www.shipsy.ai/freight-forwarder',wait_until='domcontentloaded',timeout=60000)
    page.wait_for_timeout(2500)
    print(json.dumps(page.locator('section, footer').evaluate_all('''els=>els.map(e=>({tag:e.tagName,id:e.id,class:e.className,heading:e.querySelector('h1,h2')?.innerText,text:e.innerText.slice(0,100),background:getComputedStyle(e).backgroundColor,image:getComputedStyle(e).backgroundImage,top:Math.round(e.getBoundingClientRect().top+scrollY),height:Math.round(e.getBoundingClientRect().height)}))'''),indent=2))
    page.screenshot(path='scratch/shipsy-finance-theme-reference.png',full_page=True)
    b.close()
im=Image.open('scratch/shipsy-finance-theme-reference.png'); im.thumbnail((650,6500)); im.save('scratch/shipsy-finance-theme-overview.png')
