const fs = require('fs');
const path = require('path');

function replaceWindowHash(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceWindowHash(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Fix useEffect dependencies
      let newContent = content.replace(/\[([^\]]*?)window\.location\.hash([^\]]*?)\]/g, (match, p1, p2) => {
        return `[${p1}typeof window !== 'undefined' ? window.location.hash : ''${p2}]`;
      });

      // Fix raw window.location.href or window.location.hash outside typeof checks
      // Just to be safe, anywhere we have window.location.hash, we should probably wrap it, but it's hard with regex.
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Fixed dependencies in ${fullPath}`);
      }
    }
  }
}

replaceWindowHash(path.join(__dirname, 'src'));
