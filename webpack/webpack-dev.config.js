const webpack = require('webpack');
const configs = require('./webpack-commons.config.js');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


configs.devtool = 'inline-source-map';
configs.output.filename = '[name].js';
configs.module.rules = configs.module.rules.concat([{
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: { importLoaders: 1 }
        },
        'postcss-loader'
    ]
}, ]);

configs.plugins = configs.plugins.concat([
    //creates the html file even in webpack-dev-server sessions
    new HtmlWebpackHarddiskPlugin(),

    //replaces module IDs with paths to the modules 
    //keeps module IDs stable as they aren't derived based on order. 
    new webpack.NamedModulesPlugin(),
]);

module.exports = configs;