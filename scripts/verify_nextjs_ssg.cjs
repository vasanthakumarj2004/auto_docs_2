const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function createCdpClient(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let idCounter = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = idCounter++;
    callbacks.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  return new Promise((resolve, reject) => {
    ws.onopen = () => resolve({ send, close: () => ws.close() });
    ws.onerror = reject;
  });
}

(async () => {
  const outputDir = 'C:\\Users\\vasan\\.gemini\\antigravity\\brain\\7a2c7add-7793-4285-a910-cef7ebe37eb2';
  const port = 9310;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--window-size=1440,900',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\Users\\vasan\\AppData\\Local\\Temp\\chrome_debug_nextjs_ssg'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targets = await getJson(`http://localhost:${port}/json`);
    const pageTarget = targets.find(t => t.type === 'page');
    const client = await createCdpClient(pageTarget.webSocketDebuggerUrl);
    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('CSS.enable');
    await client.send('Runtime.enable');

    const consoleErrors = [];
    const clientWs = pageTarget.webSocketDebuggerUrl;

    // Helper for screenshot
    async function capture(fileName, clip) {
      const params = { format: 'png' };
      if (clip) {
        params.clip = {
          x: Math.round(clip.x),
          y: Math.round(clip.y),
          width: Math.round(clip.width),
          height: Math.round(clip.height),
          scale: 1
        };
      }
      const shot = await client.send('Page.captureScreenshot', params);
      fs.writeFileSync(path.join(outputDir, fileName), Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot: ${fileName}`);
    }

    // 1. Visit Home Page
    console.log('Navigating to http://localhost:3000/ ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1500));

    // Evaluate SEO & Metadata
    const homeSeo = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const title = document.title;
        const desc = document.querySelector('meta[name="description"]')?.content;
        const canonical = document.querySelector('link[rel="canonical"]')?.href;
        const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
        const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
          try { return JSON.parse(s.textContent); } catch (e) { return null; }
        }).filter(Boolean);
        return { title, desc, canonical, ogTitle, jsonLdTypes: jsonLd.map(j => j['@type']) };
      })()`,
      returnByValue: true
    });
    console.log('Home Page SEO Audit:', homeSeo.result.value);

    // Cancel auto-scroll to steady the viewport
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('wheel'));
        window.dispatchEvent(new Event('keydown'));
      })()`
    });
    await new Promise(r => setTimeout(r, 500));

    await capture('ssg_desktop_home.png');

    // 2. Test Dropdown Trigger & Hover
    const trigger = await client.send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('resources-menu-trigger');
        if (!btn) return null;
        const rect = btn.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      })()`,
      returnByValue: true
    });

    if (trigger.result.value) {
      await client.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: trigger.result.value.x,
        y: trigger.result.value.y
      });
      await new Promise(r => setTimeout(r, 250));

      const panel = await client.send('Runtime.evaluate', {
        expression: `(() => {
          const p = document.getElementById('resources-mega-dropdown');
          if (!p) return null;
          const rect = p.getBoundingClientRect();
          return { x: rect.x, y: 0, width: rect.width + 80, height: rect.height + 60 };
        })()`,
        returnByValue: true
      });

      if (panel.result.value) {
        await capture('ssg_desktop_dropdown.png', {
          x: Math.max(0, panel.result.value.x - 40),
          y: 0,
          width: panel.result.value.width,
          height: panel.result.value.height + 40
        });
      }
    }

    // 3. Visit /finance/
    console.log('Navigating to http://localhost:3000/finance/ ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/finance/' });
    await new Promise(r => setTimeout(r, 1200));

    const financeSeo = await client.send('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          desc: document.querySelector('meta[name="description"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href
        };
      })()`,
      returnByValue: true
    });
    console.log('Finance Page SEO Audit:', financeSeo.result.value);
    await capture('ssg_desktop_finance.png');

    // 4. Visit /logistics/
    console.log('Navigating to http://localhost:3000/logistics/ ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/logistics/' });
    await new Promise(r => setTimeout(r, 1200));

    const logisticsSeo = await client.send('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          desc: document.querySelector('meta[name="description"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href
        };
      })()`,
      returnByValue: true
    });
    console.log('Logistics Page SEO Audit:', logisticsSeo.result.value);
    await capture('ssg_desktop_logistics.png');

    // 5. Visit /calculator/
    console.log('Navigating to http://localhost:3000/calculator/ ...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/calculator/' });
    await new Promise(r => setTimeout(r, 1200));

    const calcSeo = await client.send('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          desc: document.querySelector('meta[name="description"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href
        };
      })()`,
      returnByValue: true
    });
    console.log('Calculator Page SEO Audit:', calcSeo.result.value);
    await capture('ssg_desktop_calculator.png');

    // 6. Test Mobile Viewport (390px)
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1200));

    // Open mobile menu
    await client.send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('header button[aria-label="Open navigation"]');
        if (btn) btn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 400));
    await capture('ssg_mobile_drawer.png');

    console.log('Verification completed successfully!');
    client.close();
  } catch (err) {
    console.error('CDP verification error:', err);
  } finally {
    chrome.kill();
  }
})();
