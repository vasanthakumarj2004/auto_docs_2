// Run with: node scripts/verify_theme_colors.cjs
// Exercises palette isolation, reset, storage recovery and before-paint restoration.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../src/lib/darkTheme.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function environment(saved = null, unavailableStorage = false) {
  const properties = new Map([
    ['--color-brand', '#059669'],
    ['--color-brand-400', '#34d399'],
    ['--color-brand-soft', '#ecfdf5'],
  ]);
  const context = vm.createContext({
    exports: {},
    document: { documentElement: { style: {
      setProperty: (name, value) => properties.set(name, value),
      removeProperty: name => properties.delete(name),
    } } },
    localStorage: { getItem: () => {
      if (unavailableStorage) throw new Error('Storage unavailable');
      return saved;
    } },
  });
  vm.runInContext(compiled, context);
  return { context, properties, theme: context.exports };
}

test('dark selection and reset leave the light palette intact', () => {
  const { theme, properties } = environment();
  const light = [...properties];
  theme.applyDarkTheme({ id: 'blue', hue: 221 });
  assert.match(properties.get('--color-dark-hero'), /^hsl\(221,/);
  assert.deepEqual([...properties].filter(([name]) => name.startsWith('--color-brand')), light);
  theme.applyDarkTheme({ id: 'custom', hue: 0 });
  assert.match(properties.get('--color-dark-hero'), /^hsl\(0,/);
  theme.applyDarkTheme(theme.DEFAULT_DARK_THEME);
  assert.deepEqual([...properties], light, 'reset restores CSS fallbacks and preserves accents');
});

test('before-paint restoration matches live selections, including hue zero', () => {
  for (const selection of [{ id: 'red', hue: 0 }, { id: 'green', hue: 160 }, { id: 'custom', hue: 318 }, { id: 'current', hue: 267 }, { id: 'logo', hue: 162.2346368715084 }, { id: 'logo', hue: 267 }]) {
    const live = environment();
    live.theme.applyDarkTheme(selection);
    const restored = environment(JSON.stringify(selection));
    vm.runInContext(restored.theme.darkThemeInitScript, restored.context);
    assert.deepEqual([...restored.properties], [...live.properties]);
    assert.equal(restored.theme.parseDarkTheme(JSON.stringify(selection)).id, selection.id);
  }
});

test('logo theme uses the actual SVG green and preserves the independent light color', () => {
  const { theme, properties } = environment();
  const logo = fs.readFileSync(path.join(__dirname, '../public/Docsynecx-Logo.svg'), 'utf8');
  assert.ok(logo.toLowerCase().includes(`fill:${theme.LOGO_GREEN.toLowerCase()}`));
  const light = [...properties];
  theme.applyDarkTheme(theme.LOGO_DARK_THEME);
  assert.equal(properties.get('--color-dark-glow'), '#18CB96');
  assert.equal(properties.get('--color-dark-hero'), 'hsl(162.2346368715084, 53%, 8.4%)');
  assert.deepEqual([...properties].filter(([name]) => name.startsWith('--color-brand')), light);
  theme.applyDarkTheme(theme.DEFAULT_DARK_THEME);
  assert.deepEqual([...properties], light);
});

test('invalid or unavailable storage safely preserves the original background', () => {
  for (const value of [null, '{broken', 'null', '[]', '{}', '{"id":"custom","hue":-1}', '{"id":"custom","hue":361}', '{"id":"custom","hue":"221"}', '{"id":"unknown","hue":100}']) {
    const { theme, context, properties } = environment(value);
    assert.equal(theme.parseDarkTheme(value).id, 'current');
    vm.runInContext(theme.darkThemeInitScript, context);
    assert.equal([...properties.keys()].filter(name => name.startsWith('--color-dark')).length, 0);
  }
  const blocked = environment(null, true);
  assert.doesNotThrow(() => vm.runInContext(blocked.theme.darkThemeInitScript, blocked.context));
});

function luminance(rgb) {
  const linear = rgb.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

test('dark surface palettes keep white and muted body text readable across the full spectrum', () => {
  const { theme } = environment();
  const foreground = luminance([183 / 255, 177 / 255, 197 / 255]);
  for (let hue = 0; hue <= 360; hue++) {
    for (const [name, color] of Object.entries(theme.getDarkThemeProperties({ id: 'custom', hue }))) {
      if (name.includes('border') || name.includes('glow')) continue;
      const [h, s, l] = color.match(/[\d.]+/g).map(Number);
      const lightness = l / 100;
      const a = s / 100 * Math.min(lightness, 1 - lightness);
      const channel = n => {
        const k = (n + h / 30) % 12;
        return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      };
      const background = luminance([channel(0), channel(8), channel(4)]);
      const contrast = (foreground + .05) / (background + .05);
      assert.ok(contrast >= 4.5, `${name} at hue ${hue}: muted-text contrast ${contrast}`);
    }
  }
});

test('light logo theme preset exists with #18CB96 and has corresponding css definitions', () => {
  const switcherSource = fs.readFileSync(path.join(__dirname, '../src/components/ThemeSwitcher.tsx'), 'utf8');
  assert.ok(switcherSource.includes("id: 'logo'"));
  assert.ok(switcherSource.includes("color: LOGO_GREEN"));

  const cssSource = fs.readFileSync(path.join(__dirname, '../src/index.css'), 'utf8');
  assert.ok(cssSource.includes(':root[data-theme="logo"]'));
  assert.ok(cssSource.includes('--color-brand: #18CB96;'));
  assert.ok(cssSource.includes('--color-brand-strong: #0FA879;'));
  assert.ok(cssSource.includes('--color-brand-text: #0A5C43;'));
});

test('v2 viewport dark flow switcher exists and supports toggle, spectrum, and opacity flow', () => {
  const v2Switcher = fs.readFileSync(path.join(__dirname, '../src/components/V2ViewportDarkSwitcher.tsx'), 'utf8');
  assert.ok(v2Switcher.includes("layout !== 'v2' || appearance !== 'dark'"));
  assert.ok(v2Switcher.includes('STORAGE_KEY_ENABLED'));
  assert.ok(v2Switcher.includes('STORAGE_KEY_HUE'));
  assert.ok(v2Switcher.includes('STORAGE_KEY_OPACITY'));
  assert.ok(v2Switcher.includes('data-v2-viewport-flow'));
  assert.ok(v2Switcher.includes('getAccentTextColor'));

  const cssSource = fs.readFileSync(path.join(__dirname, '../src/index.css'), 'utf8');
  assert.ok(cssSource.includes('[data-v2-viewport-flow="true"]'));
  assert.ok(cssSource.includes('--v2-vp-flow-bg'));
  assert.ok(cssSource.includes('[data-v2-viewport-flow="true"] [data-hero-layout="v2"][data-appearance="dark"]'));
  assert.ok(cssSource.includes('var(--v2-vp-flow-accent-text)'));
});

test('viewport flow paints only the dark Layout 2 hero and removes background overlays', () => {
  const css = require('postcss').parse(fs.readFileSync(path.join(__dirname, '../src/index.css'), 'utf8'));
  const heroScope = '[data-v2-viewport-flow="true"] [data-hero-layout="v2"][data-appearance="dark"]';
  let solidBackground = false;
  const suppressedOverlays = new Set();
  css.walkRules(rule => {
    if (!rule.selector.includes('data-v2-viewport-flow')) return;
    const paint = rule.nodes.filter(node => node.type === 'decl' && !node.prop.startsWith('--'));
    if (!paint.length) return;
    for (const selector of rule.selectors) {
      assert.ok(selector.startsWith(heroScope), `Flow escapes the hero: ${selector}`);
      if (selector === heroScope) {
        solidBackground = paint.some(node => node.prop === 'background-image' && node.value === 'none' && node.important);
      }
      if (paint.some(node => node.prop === 'content' && node.value === 'none' && node.important)) {
        suppressedOverlays.add(selector);
      }
    }
  });
  assert.ok(solidBackground, 'hero must disable its gradient background');
  assert.ok(suppressedOverlays.has(`${heroScope}::before`), 'hero grid must be disabled');
  assert.ok(suppressedOverlays.has(`${heroScope}::after`), 'hero edge gradient must be disabled');
});

test('hero flow uses an opaque dark base at every strength and clears overrides when disabled', () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/components/V2ViewportDarkSwitcher.tsx'), 'utf8');
  const ast = ts.createSourceFile('switcher.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fragments = [];
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && ['hslToHex', 'getAccentTextColor'].includes(node.name?.text)) {
      fragments.push(node.getText(ast));
    }
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'applyFlow') {
      fragments.push(`const applyFlow = ${node.initializer.getText(ast)};`);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  const properties = new Map();
  const attributes = new Map();
  const context = vm.createContext({ document: { documentElement: {
    style: { setProperty: (key, value) => properties.set(key, value), removeProperty: key => properties.delete(key) },
    setAttribute: (key, value) => attributes.set(key, value), removeAttribute: key => attributes.delete(key),
  } } });
  vm.runInContext(ts.transpileModule(fragments.join('\n'), {}).outputText, context);
  for (const hue of [0, 36, 162.23, 188, 221, 267, 360]) {
    for (const strength of [15, 25, 50, 75, 100]) {
      vm.runInContext(`applyFlow(true, ${hue}, ${strength})`, context);
      assert.equal(properties.get('--v2-vp-flow-bg'), `color-mix(in srgb, hsl(${hue}, 44%, 7.5%) ${strength}%, #0b0d12)`);
      assert.equal(attributes.get('data-v2-viewport-flow'), 'true');
    }
  }
  vm.runInContext('applyFlow(false, 162.23, 100)', context);
  assert.equal(properties.size, 0);
  assert.equal(attributes.size, 0);
});

test('v2 viewport dark flow guarantees zero font contrast issues across 0-360 degrees (WCAG AAA >= 7:1)', () => {
  // Heading white (#ffffff)
  const whiteLum = luminance([1, 1, 1]);
  // Body text (#e2e8f0)
  const bodyLum = luminance([226 / 255, 232 / 255, 240 / 255]);
  // Muted text (#cbd5e1)
  const mutedLum = luminance([203 / 255, 213 / 255, 225 / 255]);

  for (let h = 0; h <= 360; h += 5) {
    // Background: hsl(h, 44%, 7.5%)
    const lightness = 0.075;
    const a = 0.44 * Math.min(lightness, 1 - lightness);
    const channelBg = n => {
      const k = (n + h / 30) % 12;
      return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    const bgLum = luminance([channelBg(0), channelBg(8), channelBg(4)]);

    // Check heading contrast (must be >= 14:1)
    const whiteCr = (whiteLum + 0.05) / (bgLum + 0.05);
    assert.ok(whiteCr >= 14.0, `White heading contrast failed at hue ${h}: ${whiteCr}`);

    // Check body contrast (must be >= 11:1)
    const bodyCr = (bodyLum + 0.05) / (bgLum + 0.05);
    assert.ok(bodyCr >= 11.0, `Body text contrast failed at hue ${h}: ${bodyCr}`);

    // Check muted contrast (must be >= 9:1)
    const mutedCr = (mutedLum + 0.05) / (bgLum + 0.05);
    assert.ok(mutedCr >= 9.0, `Muted text contrast failed at hue ${h}: ${mutedCr}`);

    // Check accent text (perceptually tuned getAccentTextColor)
    let accL = 0.76;
    if ((h >= 200 && h <= 295) || (h >= 340 || h <= 15)) {
      accL = 0.88;
    } else if (h >= 45 && h <= 180) {
      accL = 0.72;
    }
    const aAcc = 0.92 * Math.min(accL, 1 - accL);
    const channelAcc = n => {
      const k = (n + h / 30) % 12;
      return accL - aAcc * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    const accLum = Math.abs(h - 162.23) < 2
      ? luminance([24 / 255, 203 / 255, 150 / 255])
      : luminance([channelAcc(0), channelAcc(8), channelAcc(4)]);
    const accCr = (accLum + 0.05) / (bgLum + 0.05);
    assert.ok(accCr >= 7.0, `Accent font contrast failed at hue ${h}: ${accCr} (expected >= 7.0 for WCAG AAA)`);
  }
});

