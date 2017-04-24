var fs = require('fs');
var version = require('../package.json').version;

//
// Javascript
//
fs.writeFileSync("javascript/src/version.json", JSON.stringify(version), 'utf8');
