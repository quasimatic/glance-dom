module.exports = {
    entry: './javascript/src/browser/index.js',
    output: {
        filename: './dist/glance-selector.js'
    },
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
    }
};
