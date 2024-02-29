const cwd = process.cwd();
const path = require('path');
const fs = require('fs');
const destPackageJSONPath = path.join(cwd, 'runtime/package.json');
const srcPackageJSON = require(path.join(cwd, 'package.json'));
const destPackageJSON = require(destPackageJSONPath);

const ow = {
  '@adobe/openwhisk-action-utils': '^4.4.7'
};

const deps = srcPackageJSON?.dependencies ?? {};
destPackageJSON.dependencies = {
  ...ow,
  ...deps
}

fs.writeFileSync(destPackageJSONPath, JSON.stringify(destPackageJSON, null, 2))

