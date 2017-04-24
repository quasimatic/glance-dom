var fs = require('fs');
var version = require('../package.json').version;

//
// Javascript
//
fs.writeFileSync('javascript/src/version.json', JSON.stringify(version), 'utf8');

//
// Python
//
var setuppy = fs.readFileSync('py/setup.py', 'utf8');
var updatedSetupPy = setuppy.replace(/version='.*'/, 'version=\'' + version + '\'').replace(/\/tarball\/0\.3\.3/, '/tarbar/' + version);
fs.writeFileSync('py/setup.py', updatedSetupPy, 'utf8');
