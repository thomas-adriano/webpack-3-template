const webpack = require('webpack');
const configs = require('./webpack-commons.config.js');


configs.devtool = 'inline-source-map';
configs.output.filename = '[name].[hash].js';
configs.plugins = configs.plugins.concat([
    //generate identifiers that are preserved over builds (dev version)
    // new webpack.NamedModulesPlugin()
]);

module.exports = configs;