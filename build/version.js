var fs = require('fs');
var version = require('../package.json').version;

function updateVersion(file, pattern) {
	var content = fs.readFileSync(file, 'utf8');
	var update = content.replace(pattern, '$1' + version + '$3');
	fs.writeFileSync(file, update, 'utf8');
}

//
// Javascript
//
fs.writeFileSync('javascript/src/version.json', JSON.stringify(version), 'utf8');

//
// Python
//
// var setuppy = fs.readFileSync('py/setup.py', 'utf8');
// var updatedSetupPy = setuppy.replace(/version='.*'/, 'version=\'' + version + '\'').replace(/\/tarball\/0\.3\.3/, '/tarbar/' + version);
// fs.writeFileSync('py/setup.py', updatedSetupPy, 'utf8');

updateVersion('py/setup.py', /(version=')(.*)(')/);
updateVersion('py/setup.py', /(\/tarball\/)(.*)(')/);

//
// Dotnet
//
updateVersion('dotnet/Glance.Dom/Properties/AssemblyInfo.cs', /(AssemblyVersion\(")(.*)("\))/);
updateVersion('dotnet/Glance.Dom.Specs/Properties/AssemblyInfo.cs', /(AssemblyVersion\(")(.*)("\))/);
