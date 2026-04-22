const fs = require('fs');
const path = require('path');
const dir = 'src/components/OpenClawd/scenes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  fs.writeFileSync(p, content);
  console.log('Fixed', p);
});
