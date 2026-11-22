const fs = require('fs');
const path = require('path');

function syncRscPayloads(buildDir = 'build') {
  if (!fs.existsSync(buildDir)) return;

  let createdCount = 0;

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === '__PAGE__.txt') {
        // Find which route folder this belongs to
        // e.g. build/finance-desk/__next.finance-desk/__PAGE__.txt -> target folder: build/finance-desk
        // e.g. build/events/iics-2026/__next.events/iics-2026/__PAGE__.txt -> target folder: build/events/iics-2026
        const parts = path.relative(buildDir, fullPath).split(path.sep);
        
        // Find the index where __next. starts
        const nextIdx = parts.findIndex(p => p.startsWith('__next.'));
        if (nextIdx > 0) {
          const routeDir = path.join(buildDir, ...parts.slice(0, nextIdx));
          const subParts = parts.slice(nextIdx, parts.length - 1); // e.g. ['__next.events', 'iics-2026'] or ['__next.finance-desk']
          
          // Variation 1: joining with dot e.g. __next.events.iics-2026__PAGE__.txt
          const dotName = subParts[0] + (subParts.length > 1 ? '.' + subParts.slice(1).join('.') : '') + '__PAGE__.txt';
          const dotPath = path.join(routeDir, dotName);
          if (!fs.existsSync(dotPath)) {
            fs.copyFileSync(fullPath, dotPath);
            createdCount++;
          }

          // Variation 2: flat base name e.g. __next.events__PAGE__.txt
          const baseName = subParts[0] + '__PAGE__.txt';
          const basePath = path.join(routeDir, baseName);
          if (!fs.existsSync(basePath)) {
            fs.copyFileSync(fullPath, basePath);
            createdCount++;
          }

          // Variation 3: if dynamic slug e.g. $d$slug replaced with folder name
          const folderName = parts[nextIdx - 1];
          if (subParts.some(p => p.includes('$d$'))) {
            const resolvedName = subParts[0] + '.' + folderName + '__PAGE__.txt';
            const resolvedPath = path.join(routeDir, resolvedName);
            if (!fs.existsSync(resolvedPath)) {
              fs.copyFileSync(fullPath, resolvedPath);
              createdCount++;
            }
          }
        }
      }
    }
  }

  walk(buildDir);
  console.log(`[post_build] Generated ${createdCount} flat RSC prefetch files to prevent 404s.`);
}

function syncPublicAssets(buildDir = 'build') {
  const assets = [
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
    'favicon.ico',
    'site.webmanifest',
    'robots.txt'
  ];

  for (const a of assets) {
    const src = path.join('public', a);
    const dest = path.join(buildDir, a);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log('[post_build] Synced public manifests, icons, and robots.txt to build directory.');
}

syncRscPayloads('build');
syncPublicAssets('build');
