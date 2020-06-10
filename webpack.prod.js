const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let dev = merge(common, {
    mode: 'production',
    entry: {
        'index': path.join(__dirname, 'src', 'main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html')
        })
    ],
});
module.exports = dev;
