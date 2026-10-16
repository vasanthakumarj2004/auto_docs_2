const fs = require('fs');

const files = [
  'src/app/finance/page.tsx',
  'src/app/accounts-payable/page.tsx',
  'src/app/logistics/page.tsx',
  'src/app/logistics-trade/page.tsx',
  'src/app/calculator/page.tsx',
  'src/App.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/@\/src\/pages\//g, '@/src/views/');
    content = content.replace(/\.\/pages\//g, './views/');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated imports in', file);
  }
}
