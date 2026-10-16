const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      let content = fs.readFileSync(full, 'utf8');
      const updated = content
        .replace(/from\s+['"](\.\.\/)+src\//g, "from '@/src/")
        .replace(/import\s+['"](\.\.\/)+src\//g, "import '@/src/");
      if (updated !== content) {
        fs.writeFileSync(full, updated, 'utf8');
        console.log('Fixed imports in', full);
      }
    }
  }
}

walk('src/app');
