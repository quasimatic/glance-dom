module.exports = {
	entry: './javascript/src/browser/jquery.js',
	output: {
		filename: './dist/glance-dom-jquery.js'
	},
	module: {
		rules: [
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
