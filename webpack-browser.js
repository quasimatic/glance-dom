var webpack = require('webpack');

module.exports = {
	entry: './javascript/src/browser/index.js',
	output: {
		filename: './dist/glance-dom.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],

	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					ignore: [
						'**/*-spec.js'
					],
					presets: ['env'],
					plugins: ['transform-object-rest-spread', 'transform-object-assign']
				}
			}
		]
	}
};
