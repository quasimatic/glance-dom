var wallabyWebpack = require('wallaby-webpack');

module.exports = function(wallaby) {
	var webpackPostprocessor = wallabyWebpack({
		module: {
			loaders: [
				{
					test: /.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['es2015']
					}
				}
			]
		},
		node: {
			fs: "empty"
		}
	});

	return {
		files: [
			{pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
			{pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
			{pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
			{pattern: 'node_modules/react/umd/react.production.min.js', instrument: false},

			{pattern: 'node_modules/chai/chai.js', instrument: false},

			{pattern: 'javascript/src/**/*.js*', load: false},
			{pattern: 'package.json', load: false},
			{pattern: '!javascript/src/**/*-spec.js', load: false},
			{pattern: 'javascript/test/**/*.js', load: false},
			{pattern: '!javascript/test/**/*-specs.js', load: false}
		],

		tests: [
			{pattern: 'javascript/src/**/*-spec.js', load: false},
			{pattern: 'javascript/test/**/*-specs.js', load: false}
		],

		filesWithNoCoverageCalculated: ['javascript/src/parser/index.js'],

		compilers: {
			'**/*.js': wallaby.compilers.babel({
				presets: ['es2015', 'react', 'stage-0'],
				babel: require('babel-core')
			})
		},

		postprocessor: webpackPostprocessor,

		testFramework: 'mocha',

		setup: function() {
			window.expect = chai.expect;

			var should = chai.should();

			window.__moduleBundler.loadTests();
		}
	};
};
