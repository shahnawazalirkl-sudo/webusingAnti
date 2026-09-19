const fs = require('fs');

const files = [
  'src/app/collections/page.tsx',
  'src/app/personalized/page.tsx',
  'src/app/shop/page.tsx',
  'src/app/track-order/page.tsx',
  'src/app/wedding-keepsakes/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Find the default export name
  const exportMatch = content.match(/export default ([A-Za-z0-9_]+);/);
  if (!exportMatch) continue;
  
  const componentName = exportMatch[1];
  
  // Check if already wrapped
  if (content.includes('export default function')) continue;

  // Rename original component to InnerComponent
  content = content.replace(`const ${componentName} =`, `const ${componentName}Inner =`);
  content = content.replace(`function ${componentName}(`, `function ${componentName}Inner(`);
  
  // Replace export
  content = content.replace(
    `export default ${componentName};`,
    `import { Suspense } from 'react';\nexport default function ${componentName}() {\n  return (\n    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>}>\n      <${componentName}Inner />\n    </Suspense>\n  );\n}`
  );

  fs.writeFileSync(file, content);
  console.log(`Wrapped ${file}`);
}
