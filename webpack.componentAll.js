const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let dev = merge(common, {
    mode: 'production',
    entry: {
        'index': path.join(__dirname, 'packages', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name].js',
        library: 'ui-pkg',
        libraryTarget: 'umd'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});
module.exports = dev;