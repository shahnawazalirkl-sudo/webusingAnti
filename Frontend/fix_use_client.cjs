const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const hasUseClient = content.includes('"use client"') || content.includes("'use client'");
    
    if (hasUseClient) {
      let lines = content.split('\n');
      let useClientIndex = -1;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"use client"') || lines[i].includes("'use client'")) {
          useClientIndex = i;
          break;
        }
      }

      if (useClientIndex > 0) {
        let actualUseClientIndex = -1;
        for (let i=0; i<lines.length; i++) {
           if (lines[i].trim().match(/^['"]use client['"];?$/)) {
             actualUseClientIndex = i;
             break;
           }
        }
        
        if (actualUseClientIndex > 0) {
            const useClientLine = lines[actualUseClientIndex];
            lines.splice(actualUseClientIndex, 1);
            lines.unshift(useClientLine);
            fs.writeFileSync(filePath, lines.join('\n'));
            console.log(`Fixed use client in ${filePath}`);
        }
      }
    }
  }
});
