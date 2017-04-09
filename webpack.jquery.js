var webpack = require('webpack');

module.exports = {
    entry: './javascript/src/browser/glance-jquery.js',
    output: {
        filename: './dist/glance-jquery.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
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
