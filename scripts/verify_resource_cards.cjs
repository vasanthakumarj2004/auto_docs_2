// Run with: node scripts/verify_resource_cards.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');

function loadComponent(filename) {
  const source = fs.readFileSync(path.join(root, 'src/components', filename), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: {
    target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  } }).outputText;
  const context = vm.createContext({ exports: {}, require: name => name.endsWith('.module.css')
    ? new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
    : require(name) });
  vm.runInContext(compiled, context);
  return context.exports;
}
const provider = loadComponent('ResourceCardStyleProvider.tsx');
const { ResourcesMenuVariants } = loadComponent('ResourcesMenuVariants.tsx');

test('six distinct choices retain Original and reject unknown saved styles', () => {
  const ids = provider.RESOURCE_CARD_STYLES.map(item => item.id);
  assert.equal(new Set(ids).size, 6);
  assert.ok(ids.includes('original'));
  for (const id of ids) assert.ok(provider.isResourceCardStyle(id));
  for (const value of [null, '', 'invalid', '<script>', 0]) assert.equal(provider.isResourceCardStyle(value), false);
});

test('every alternative renders all Resources links on desktop and mobile', () => {
  for (const { id } of provider.RESOURCE_CARD_STYLES.filter(item => item.id !== 'original')) {
    for (const compact of [false, true]) {
      const html = renderToStaticMarkup(React.createElement(ResourcesMenuVariants, { variant: id, compact, onNavigate: () => {} }));
      for (const label of ['Invoice Automation', 'Logistics &amp; Supply Chain', 'How we do', 'Free ROI Calculator', 'Tally &amp; ERP Integrations', 'FAQ &amp; Help Center']) {
        assert.ok(html.includes(label), `${id}, compact=${compact}: ${label}`);
      }
      for (const route of ['/finance', '/logistics', '/calculator', '/#how-it-works', '/#faq', '/demo/']) {
        assert.ok(html.includes(`href="${route}"`), `${id}: missing ${route}`);
      }
      assert.ok(html.includes(`data-resource-style="${id}"`));
      assert.ok(!html.includes('undefined'));
    }
  }
});

test('Spotlight renders both desk previews with existing images and working links', () => {
  for (const activeSlide of [0, 1]) {
    const html = renderToStaticMarkup(React.createElement(ResourcesMenuVariants, {
      variant: 'spotlight', activeSlide, onSlideChange: () => {}, onNavigate: () => {},
    }));
    const desk = activeSlide === 0 ? 'finance' : 'logistics';
    assert.ok(html.includes(`src="/images/${desk}-desk-card.jpg"`));
    assert.ok(html.includes(`href="/${desk}"`));
    assert.ok(fs.existsSync(path.join(root, 'public/images', `${desk}-desk-card.jpg`)));
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1);
  }
});
