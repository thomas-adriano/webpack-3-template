const webpack = require('webpack');
const configs = require('./webpack-commons.config.js');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


configs.devtool = 'inline-source-map';
configs.output.filename = '[name].js';
configs.plugins = configs.plugins.concat([
    //creates the html file even in webpack-dev-server sessions
    new HtmlWebpackHarddiskPlugin(),
    new webpack.NamedModulesPlugin(),
]);

module.exports = configs;