const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const components = require('./components.json');

const entrys = {};
Object.keys(components).forEach(key => {
    entrys[key] = components[key];
});

let conf = merge(common, {
    entry: entrys,
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name].js'
    }
});

module.exports = conf;
