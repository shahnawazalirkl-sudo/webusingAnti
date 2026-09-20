const fs = require('fs');
const path = 'f:/asrawedding/webusingAnti/Frontend/src/data/productsData.ts';
let content = fs.readFileSync(path, 'utf8');

let days = 0;
// We'll match `id: "`
content = content.replace(/id: \"([^\"]+)\",/g, (match, id) => {
  const d = new Date('2023-01-01');
  d.setDate(d.getDate() + (days++ * 5)); // Increase by 5 days for each product
  return 'createdAt: \"' + d.toISOString() + '\",\n    ' + match;
});

fs.writeFileSync(path, content);
console.log('Added createdAt fields to productsData.ts');
