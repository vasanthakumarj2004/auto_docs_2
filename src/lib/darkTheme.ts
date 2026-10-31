// Dark surfaces have their own palette. Accent colors remain in --color-brand-*.
export const DARK_THEME_KEY = 'autodocs-dark-theme';
export type DarkTheme = { id: string; hue: number };
export const DEFAULT_DARK_THEME: DarkTheme = { id: 'current', hue: 267 };
// Exact arrow color in public/Docsynecx-Logo.svg and its footer variant.
export const LOGO_GREEN = '#18CB96';
export const LOGO_DARK_THEME: DarkTheme = { id: 'logo', hue: 162.2346368715084 };

// Fixed saturation/lightness keeps all background hues dark enough for white text.
const surfaces: Record<string, [number, number]> = {
  '--color-dark-hero': [53, 8.4],
  '--color-dark-hero-end': [47, 11.8],
  '--color-dark-section': [33, 7.6],
  '--color-dark-card': [33, 9.4],
  '--color-dark-surface': [32, 12.7],
  '--color-dark-border': [16, 23],
  '--color-dark-nav-border': [31, 18],
  '--color-dark-bento': [33, 11.2],
  '--color-dark-workflow': [34, 12],
  '--color-dark-panel': [30, 15.7],
  '--color-dark-node': [26, 17],
  '--color-dark-rules': [30, 21.8],
  '--color-dark-data': [30, 13.9],
  '--color-dark-panel-border': [15, 40],
  '--color-dark-glow': [46, 37],
};

export function parseDarkTheme(value: string | null): DarkTheme {
  try {
    const parsed = JSON.parse(value || 'null');
    if (parsed && ['current', 'custom', 'green', 'light-green', 'red', 'blue', 'yellow', 'orange', 'logo'].includes(parsed.id)
      && typeof parsed.hue === 'number' && Number.isFinite(parsed.hue) && parsed.hue >= 0 && parsed.hue <= 360) {
      if (parsed.id === 'logo') return LOGO_DARK_THEME;
      return parsed.id === 'current' ? DEFAULT_DARK_THEME : { id: parsed.id, hue: parsed.hue };
    }
  } catch { /* A missing or invalid saved preference uses the original purple. */ }
  return DEFAULT_DARK_THEME;
}

export function getDarkThemeProperties(theme: DarkTheme): Record<string, string> {
  const hue = theme.id === 'logo' ? LOGO_DARK_THEME.hue : theme.hue;
  return Object.fromEntries(Object.entries(surfaces).map(([name, [saturation, lightness]]) => [
    name, theme.id === 'current' ? '' : theme.id === 'logo' && name === '--color-dark-glow'
      ? LOGO_GREEN : `hsl(${hue}, ${saturation}%, ${lightness}%)`,
  ]));
}

export function applyDarkTheme(theme: DarkTheme) {
  for (const [name, value] of Object.entries(getDarkThemeProperties(theme))) {
    if (value) document.documentElement.style.setProperty(name, value);
    else document.documentElement.style.removeProperty(name);
  }
}

// Restore before first paint, using the same surface definitions as the live picker.
export const darkThemeInitScript = `(function(){try{var t=JSON.parse(localStorage.getItem('${DARK_THEME_KEY}')||'null');if(!t||t.id==='current'||!['custom','green','light-green','red','blue','yellow','orange','logo'].includes(t.id)||typeof t.hue!=='number'||!Number.isFinite(t.hue)||t.hue<0||t.hue>360)return;if(t.id==='logo')t.hue=${LOGO_DARK_THEME.hue};var p=${JSON.stringify(surfaces)};Object.keys(p).forEach(function(k){document.documentElement.style.setProperty(k,t.id==='logo'&&k==='--color-dark-glow'?'${LOGO_GREEN}':'hsl('+t.hue+', '+p[k][0]+'%, '+p[k][1]+'%)')})}catch(e){}})();`;
