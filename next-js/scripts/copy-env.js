require('dotenv').config();
const fs = require('fs');

const allFileContents = fs.readFileSync('.next/standalone/server.js', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

const indexPath = 'dist/application/actions/pages-temp/index.js';
let index = fs.readFileSync(indexPath).toString();

index = index.replace('HOSTNAME', `'${process.env.AIO_runtime_namespace}.adobeio-static.net'`)

for (const line of lines) {
  if (line.trim().startsWith('conf:')) {
    const conf = line.replace('conf:', '');
    
    fs.writeFileSync(indexPath, index.replace('NEXTJS_CONFIGURATION', conf.trim()));
    
    break;
  }
}
