const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let dev = merge(common, {
    mode: 'development',
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
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
});
module.exports = dev;
