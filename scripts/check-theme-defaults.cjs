// Run after npm run build. Check the actual exported startup script and stylesheet.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const postcss = require('postcss');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'out/index.html'), 'utf8');
const initialTheme = html.match(/<html\b[^>]*data-theme="([^"]+)"/)?.[1];
const startup = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(script => script.includes("getItem('autodocs-theme')"));
assert.ok(startup, 'Export must include the theme startup script');
assert.equal(initialTheme, 'logo', 'Server-rendered HTML must start green');

const cssFiles = [...html.matchAll(/<link\b[^>]*href="([^"]+\.css(?:\?[^\"]*)?)"[^>]*>/g)]
  .map(match => match[1].split('?')[0]).filter(href => href.startsWith('/'));
const css = postcss.parse(cssFiles.map(file => fs.readFileSync(path.join(root, 'out', file.slice(1)), 'utf8')).join('\n'));

function brandColor(theme) {
  let value;
  let specificity = 0;
  css.walkRules(rule => {
    for (const selector of rule.selectors) {
      const match = selector.match(/^:root(?:\[data-theme=["']?([^\]"']+)["']?\])?$/);
      if (!match || (match[1] && match[1] !== theme)) continue;
      const weight = match[1] ? 2 : 1;
      rule.walkDecls('--color-brand', declaration => {
        if (weight >= specificity) { value = declaration.value.toLowerCase(); specificity = weight; }
      });
    }
  });
  return value;
}

assert.equal(brandColor(undefined), '#18cb96', 'CSS-only visits must be green');
assert.equal(brandColor('current'), '#18cb96', 'Legacy default selector must be green');

for (const [saved, expected] of [
  [null, 'logo'], ['current', 'logo'], ['logo', 'logo'],
  ['green', 'green'], ['blue', 'blue'], ['violet', 'violet'],
  ['invalid', 'logo'], ['custom:invalid', 'logo'], ['custom:361', 'logo'],
  ['custom:160', 'custom'],
]) {
  const attributes = { 'data-theme': initialTheme };
  const properties = {};
  vm.runInNewContext(startup, {
    localStorage: { getItem: () => saved },
    document: { documentElement: {
      setAttribute: (name, value) => { attributes[name] = value; },
      style: { setProperty: (name, value) => { properties[name] = value; } },
    } },
  });
  assert.equal(attributes['data-theme'], expected, `Saved preference: ${saved}`);
  if (expected === 'logo') assert.equal(brandColor(expected), '#18cb96');
  if (expected === 'custom') assert.equal(properties['--color-brand'], 'hsl(160, 92%, 54%)');
}

vm.runInNewContext(startup, {
  localStorage: { getItem: () => { throw new Error('Storage unavailable'); } },
});
console.log('PASS: green first paint, CSS-only fallback, legacy preference migration, saved presets, custom colors, invalid preferences, and blocked storage.');
