var webpack = require('webpack');

module.exports = {
    entry: './javascript/src/browser/glance-dom.js',
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
                    presets: ['es2015']
                }
            }
        ]
    }
};
