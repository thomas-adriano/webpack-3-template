const webpack = require('webpack');
const configs = require('./webpack-commons.config.js');


configs.devtool = 'inline-source-map';
configs.output.filename = '[name].js';
configs.plugins = configs.plugins.concat([
]);

module.exports = configs;