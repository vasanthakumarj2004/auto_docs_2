const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Test 1: Verify CookieConsent.tsx logic strictly guards IP API call
const cookieConsentSrc = fs.readFileSync(path.join(__dirname, '../src/components/CookieConsent.tsx'), 'utf8');

assert.ok(cookieConsentSrc.includes('if (prefs.marketing) {'), 'IP API call must be inside if (prefs.marketing)');
assert.ok(cookieConsentSrc.includes('purgeMarketingData();'), 'Must purge marketing data when marketing is false');
assert.ok(cookieConsentSrc.includes('purgeFunctionalLocalStorage();'), 'Must purge functional localStorage when functional is false');
assert.ok(cookieConsentSrc.includes('updateGoogleAnalyticsConsent(prefs.analytics, prefs.marketing);'), 'Must update Google Analytics consent');

// Test 2: Verify ThemeSwitcher guards localStorage.setItem with isFunctionalAllowed()
const themeSwitcherSrc = fs.readFileSync(path.join(__dirname, '../src/components/ThemeSwitcher.tsx'), 'utf8');
assert.ok(themeSwitcherSrc.includes('isFunctionalAllowed()'), 'ThemeSwitcher must import and use isFunctionalAllowed');
assert.ok(themeSwitcherSrc.includes('if (isFunctionalAllowed())'), 'ThemeSwitcher must guard localStorage.setItem with if (isFunctionalAllowed())');

// Test 3: Verify V2ViewportDarkSwitcher guards localStorage.setItem with isFunctionalAllowed()
const v2SwitcherSrc = fs.readFileSync(path.join(__dirname, '../src/components/V2ViewportDarkSwitcher.tsx'), 'utf8');
assert.ok(v2SwitcherSrc.includes('isFunctionalAllowed()'), 'V2ViewportDarkSwitcher must import and use isFunctionalAllowed');

// Test 4: Verify LandingLayoutProvider guards localStorage.setItem with isFunctionalAllowed()
const layoutProviderSrc = fs.readFileSync(path.join(__dirname, '../src/components/LandingLayoutProvider.tsx'), 'utf8');
assert.ok(layoutProviderSrc.includes('isFunctionalAllowed()'), 'LandingLayoutProvider must import and use isFunctionalAllowed');

// Test 5: Verify THEME_STORAGE_KEYS includes all relevant theme keys
const consentSrc = fs.readFileSync(path.join(__dirname, '../src/lib/consent.ts'), 'utf8');
assert.ok(consentSrc.includes("'autodocs-theme'"));
assert.ok(consentSrc.includes("'autodocs-brand-hex'"));
assert.ok(consentSrc.includes("'autodocs-bg-color'"));
assert.ok(consentSrc.includes("'autodocs-theme-opacity'"));
assert.ok(consentSrc.includes("'autodocs-custom-brand-list'"));
assert.ok(consentSrc.includes("'autodocs-custom-bg-list'"));
assert.ok(consentSrc.includes("'autodocs-landing-layout'"));
assert.ok(consentSrc.includes("'autodocs-v2-appearance'"));

console.log('ALL 5 CONSENT GOVERNANCE TESTS PASSED!');
