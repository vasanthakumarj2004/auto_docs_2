const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const postersDir = path.join(__dirname, '..', 'public', 'videos', 'posters');
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir, { recursive: true });
}

const posters = [
  {
    name: 'walkthrough-poster.webp',
    width: 1280,
    height: 720,
    bgGradient: ['#0B1120', '#1E293B'],
    accent: '#2563EB',
    badge: 'DOCSYNECX 2-MIN WALKTHROUGH',
    title: 'Bills read, checked, paid and posted to Tally',
    sub: 'Multi-Channel Intake → AI Extraction → GST 2B Guardrails → Tally XML Push',
    tag: '1080p HD · 4 Chapters · 2:00',
  },
  {
    name: 'demo-modal-poster.webp',
    width: 1280,
    height: 720,
    bgGradient: ['#0B1120', '#1E1B4B'],
    accent: '#3B82F6',
    badge: 'LIVE PRODUCT DEMONSTRATION',
    title: 'See Docsynecx In Action',
    sub: 'Watch raw vendor PDFs and booking emails transform into clean ERP records',
    tag: 'Interactive Demo · Subtitles Available',
  },
  {
    name: 'finance-loop-poster.webp',
    width: 960,
    height: 640,
    bgGradient: ['#042F2E', '#064E3B'],
    accent: '#10B981',
    badge: 'FINANCE DESK AUTOMATION',
    title: 'Prime Components · Tax Invoice #829',
    sub: 'Extracted ₹74,095 · GSTIN 33AABCP1234A1Z5 · 100% Tax Math Verified',
    tag: 'TallyPrime XML Server · Native Sync',
  },
  {
    name: 'logistics-loop-poster.webp',
    width: 960,
    height: 640,
    bgGradient: ['#042F2E', '#0F3836'],
    accent: '#14B8A6',
    badge: 'LOGISTICS DESK AUTOMATION',
    title: 'Customer Email → CargoWise Job #S00038421',
    sub: 'Chennai to Singapore · 1x40 HC · BL &amp; Packing List Cross-Checked',
    tag: 'CargoWise One eAdaptor · Native Sync',
  },
  {
    name: 'rajadurai-poster.webp',
    width: 640,
    height: 360,
    bgGradient: ['#064E3B', '#022C22'],
    accent: '#34D399',
    badge: 'CUSTOMER CASE STUDY',
    title: 'Rajadurai E-Vehicles',
    sub: 'Purchase, spares &amp; service entry: Days → hours',
    tag: 'TallyPrime Integration · Verified Outcome',
  },
  {
    name: 'ft-logistics-poster.webp',
    width: 640,
    height: 360,
    bgGradient: ['#0F3836', '#042F2E'],
    accent: '#2DD4BF',
    badge: 'CUSTOMER CASE STUDY',
    title: 'FT Logistics',
    sub: 'Email-to-CargoWise posting: 2 hrs → 2 min',
    tag: 'CargoWise One Integration · Verified Outcome',
  },
  {
    name: 'facade-poster.webp',
    width: 1280,
    height: 720,
    bgGradient: ['#0B1120', '#111827'],
    accent: '#2563EB',
    badge: 'PLATFORM ARCHITECTURE',
    title: 'Docsynecx Autonomous Document Pipeline',
    sub: 'Zero Screen-Scrapers · SOC2 Ready · Native XML &amp; eAdaptor APIs',
    tag: 'Enterprise Overview · Privacy-Preserving Mode',
  },
];

async function generate() {
  for (const p of posters) {
    const svg = `
    <svg width="${p.width}" height="${p.height}" viewBox="0 0 ${p.width} ${p.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.bgGradient[0]}" />
          <stop offset="100%" stop-color="${p.bgGradient[1]}" />
        </linearGradient>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1" fill="#FFFFFF" fill-opacity="0.08" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="${p.accent}" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#glow)" />

      <!-- Outer Frame Border -->
      <rect x="24" y="24" width="${p.width - 48}" height="${p.height - 48}" rx="20" fill="none" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5" />

      <!-- Brand Mark & Eyebrow Pill -->
      <g transform="translate(60, 70)">
        <rect x="0" y="0" width="32" height="32" rx="8" fill="${p.accent}" />
        <text x="16" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" text-anchor="middle">D</text>
        <rect x="42" y="4" width="${p.badge.length * 8.5 + 24}" height="24" rx="6" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" />
        <text x="54" y="20" font-family="'JetBrains Mono', Consolas, monospace" font-size="11" font-weight="700" fill="#93C5FD" letter-spacing="1">${p.badge}</text>
      </g>

      <!-- Center Play Button Watermark -->
      <g transform="translate(${p.width / 2}, ${p.height / 2 - 20})">
        <circle cx="0" cy="0" r="44" fill="${p.accent}" fill-opacity="0.9" />
        <polygon points="-8,-14 16,0 -8,14" fill="#FFFFFF" />
      </g>

      <!-- Title & Subtitle -->
      <g transform="translate(${p.width / 2}, ${p.height - 180})" text-anchor="middle">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="${p.width > 800 ? 32 : 22}" fill="#FFFFFF">${p.title}</text>
        <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="${p.width > 800 ? 16 : 12}" fill="#94A3B8">${p.sub}</text>
      </g>

      <!-- Bottom Tag Pill -->
      <g transform="translate(${p.width / 2}, ${p.height - 80})" text-anchor="middle">
        <text x="0" y="0" font-family="'JetBrains Mono', Consolas, monospace" font-size="11" font-weight="600" fill="#64748B">${p.tag}</text>
      </g>
    </svg>
    `;

    const dest = path.join(postersDir, p.name);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(dest);
    console.log(`Generated: ${p.name}`);
  }
}

generate().catch(console.error);
