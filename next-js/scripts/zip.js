const rtLib = require('@adobe/aio-lib-runtime');
const fs = require('fs')
const path = require('path')

const OUTPUT_DIR = 'dist/application/actions/actions'

if(!fs.existsSync(path.join(process.cwd(), OUTPUT_DIR))) {
  fs.mkdirSync(path.join(process.cwd(), OUTPUT_DIR))
}

rtLib.utils.zip(
  'dist/application/actions/pages-temp',
  `${OUTPUT_DIR}/pages.zip`
)
