with open('src/components/Header.tsx', 'r', encoding='utf-8') as f:
    header = f.read()

# 1. Update Header.tsx
if 'AutoDocsLogo' not in header:
    header = header.replace("import { NavDropdown } from './NavDropdown';", "import { NavDropdown } from './NavDropdown';\nimport { AutoDocsLogo } from './AutoDocsLogo';")

header = header.replace(
'''            <img
              src="/autodocs-logo.svg"
              alt="AutoDocs"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
            />''',
'''            <AutoDocsLogo className="h-8 sm:h-9 w-auto transition-opacity group-hover:opacity-90" />'''
)

with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(header)

# 2. Update Footer.tsx
with open('src/components/Footer.tsx', 'r', encoding='utf-8') as f:
    footer = f.read()

if 'AutoDocsLogo' not in footer:
    footer = footer.replace("import { useRouter } from '../lib/router';", "import { useRouter } from '../lib/router';\nimport { AutoDocsLogo } from './AutoDocsLogo';")

footer = footer.replace(
'''              <img
                src="/autodocs-logo-footer.svg"
                alt="AutoDocs"
                className="h-10 sm:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-95"
              />''',
'''              <AutoDocsLogo
                variant="footer"
                className="h-10 sm:h-11 w-auto transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-95"
              />'''
)

with open('src/components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(footer)

print("Both Header.tsx and Footer.tsx successfully updated with AutoDocsLogo!")
