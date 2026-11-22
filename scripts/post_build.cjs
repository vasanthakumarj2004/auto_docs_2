const fs = require('fs');
const path = require('path');

function syncRscPayloads(buildDir = 'build') {
  if (!fs.existsSync(buildDir)) return;

  let createdCount = 0;

  function copyIfMissing(src, dest) {
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      try {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
        createdCount++;
      } catch (e) {
        // ignore
      }
    }
  }

  // 1. Walk build directory and find all __PAGE__.txt and index.txt files
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === '__PAGE__.txt' || entry.name === 'index.txt') {
        const parts = path.relative(buildDir, fullPath).split(path.sep);
        
        // Find if this is inside a __next.* folder
        const nextIdx = parts.findIndex(p => p.startsWith('__next.'));
        
        if (nextIdx > 0) {
          const routeDir = path.join(buildDir, ...parts.slice(0, nextIdx));
          const subParts = parts.slice(nextIdx, parts.length - 1);
          
          // Folder segment e.g. 'finance-desk', 'solutions', 'iics-2026'
          const leafFolder = parts[nextIdx - 1];
          // Parent segments joined e.g. 'events.iics-2026'
          const routeParts = parts.slice(0, nextIdx);
          const routeDot = routeParts.join('.');

          // All filename patterns requested by Next.js client prefetch router:
          const targetFilenames = new Set([
            // Standard: __next.<route>.__PAGE__.txt
            `__next.${routeDot}.__PAGE__.txt`,
            `__next.${routeDot}._PAGE__.txt`,
            `__next.${routeDot}__PAGE__.txt`,
            // Leaf-only: __next.<leaf>.__PAGE__.txt
            `__next.${leafFolder}.__PAGE__.txt`,
            `__next.${leafFolder}._PAGE__.txt`,
            `__next.${leafFolder}__PAGE__.txt`,
            // subParts raw
            `${subParts[0]}.__PAGE__.txt`,
            `${subParts[0]}._PAGE__.txt`,
            `${subParts[0]}__PAGE__.txt`,
          ]);

          if (subParts.length > 1) {
            const subJoined = subParts[0] + '.' + subParts.slice(1).join('.');
            targetFilenames.add(`${subJoined}.__PAGE__.txt`);
            targetFilenames.add(`${subJoined}._PAGE__.txt`);
            targetFilenames.add(`${subJoined}__PAGE__.txt`);
          }

          for (const fname of targetFilenames) {
            copyIfMissing(fullPath, path.join(routeDir, fname));
          }
        }
      }
    }
  }

  walk(buildDir);

  // 2. Secondary pass: ensure EVERY directory with an index.html has prefetch files
  function ensureRoutePrefetch(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    const hasIndexHtml = entries.some(e => e.name === 'index.html');
    const rel = path.relative(buildDir, currentDir);

    if (hasIndexHtml && rel.length > 0) {
      const folderName = path.basename(currentDir);
      const relParts = rel.split(path.sep);
      const dotPath = relParts.join('.');

      // Look for any existing .txt file in this directory or subdirectories
      let fallbackRsc = null;
      if (fs.existsSync(path.join(currentDir, 'index.txt'))) {
        fallbackRsc = path.join(currentDir, 'index.txt');
      }

      if (!fallbackRsc) {
        // Look inside nested __next.*
        const nextDir = entries.find(e => e.isDirectory() && e.name.startsWith('__next.'));
        if (nextDir) {
          const candidate = path.join(currentDir, nextDir.name, '__PAGE__.txt');
          if (fs.existsSync(candidate)) fallbackRsc = candidate;
        }
      }

      if (fallbackRsc) {
        const variants = [
          `__next.${dotPath}.__PAGE__.txt`,
          `__next.${dotPath}._PAGE__.txt`,
          `__next.${dotPath}__PAGE__.txt`,
          `__next.${folderName}.__PAGE__.txt`,
          `__next.${folderName}._PAGE__.txt`,
          `__next.${folderName}__PAGE__.txt`,
          `__next._full.txt`,
          `__next._tree.txt`,
          `__next._index.txt`
        ];

        for (const v of variants) {
          copyIfMissing(fallbackRsc, path.join(currentDir, v));
        }
      }
    }

    for (const e of entries) {
      if (e.isDirectory() && !e.name.startsWith('__next.')) {
        ensureRoutePrefetch(path.join(currentDir, e.name));
      }
    }
  }

  ensureRoutePrefetch(buildDir);

  console.log(`[post_build] Generated ${createdCount} flat RSC prefetch files to prevent 404s.`);
}

function syncPublicAssets(buildDir = 'build') {
  const assets = [
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
    'favicon.ico',
    'site.webmanifest',
    'robots.txt',
    'ard.json',
    'ai-catalog.json',
    'llms.txt',
    'llms-full.txt',
    '.htaccess'
  ];

  for (const a of assets) {
    const src = path.join('public', a);
    const dest = path.join(buildDir, a);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  // Also sync .well-known
  const wellKnownSrc = path.join('public', '.well-known');
  const wellKnownDest = path.join(buildDir, '.well-known');
  if (fs.existsSync(wellKnownSrc)) {
    fs.mkdirSync(wellKnownDest, { recursive: true });
    for (const f of fs.readdirSync(wellKnownSrc)) {
      fs.copyFileSync(path.join(wellKnownSrc, f), path.join(wellKnownDest, f));
    }
  }

  console.log('[post_build] Synced public manifests, ARD, icons, and robots.txt to build directory.');
}

syncRscPayloads('build');
syncPublicAssets('build');

// Clean up dev lock/artifacts if any were left in build
const devDir = path.join('build', 'dev');
if (fs.existsSync(devDir)) {
  try {
    fs.rmSync(devDir, { recursive: true, force: true });
    console.log('[post_build] Removed build/dev folder to prevent file lock issues.');
  } catch (e) {
    // ignore
  }
}
