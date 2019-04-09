const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let dev = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
});
module.exports = dev;