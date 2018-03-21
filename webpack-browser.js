module.exports = {
	entry: './javascript/src/browser/index.js',
	output: {
		filename: './glance-dom.js'
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
