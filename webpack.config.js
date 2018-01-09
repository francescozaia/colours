const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.sass$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
        new UglifyJsPlugin({
            parallel: 4,
            sourceMap: true
        })
    ]
};