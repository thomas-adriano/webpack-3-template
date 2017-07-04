const webpack = require('webpack');
const configs = require('./webpack-commons.config.js');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const Merge = require('webpack-merge');

module.exports = Merge(configs, {
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ],
    },
    plugins: [
        //creates the html file even in webpack-dev-server sessions
        new HtmlWebpackHarddiskPlugin(),

        //replaces module IDs with paths to the modules 
        //keeps module IDs stable as they aren't derived based on order. 
        new webpack.NamedModulesPlugin(),
    ]
});