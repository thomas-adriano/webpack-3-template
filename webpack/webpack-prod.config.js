const configs = require('./webpack-commons.config.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

configs.devtool = 'cheap-module-source-map';
// https://webpack.js.org/configuration/output/#output-publicpath
// This is an important option when using on-demand-loading 
// or loading external resources like images, files, etc. 
// If an incorrect value is specified you'll receive 404 
// errors while loading these resources.
// The value of the option is prefixed to every URL created 
// by the runtime or loaders. Because of this the value of 
// this option ends with /
// configs.output.publicPath = 'http://localhost:8081/';
configs.output.filename = '[name].[chunkhash].js';

configs.module.rules = configs.module.rules.concat([{
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [{
            loader: 'image-webpack-loader',
            query: {
                progressive: true,
                pngquant: {
                    optimizationLevel: 7,
                    interlaced: true,
                    quality: '65-90',
                    speed: 4
                },
                mozjpeg: {
                    quality: 65
                },
                gifsicle: {
                    optimizationLevel: 7,
                    interlaced: true,
                    optimizationLevel: 2
                }
            }
        }]
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
        }),
    }
]);

configs.plugins = configs.plugins.concat([
    //generate identifiers that are preserved over builds
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),

    //replaces module IDs with hashes of the modules
    //keeps module IDs stable as they aren't derived based on order. 
    new webpack.HashedModuleIdsPlugin(),

    new ScriptExtHtmlWebpackPlugin({
        preload: /\.js$/,
        sync: /vendor\./,
        defaultAttribute: 'async'
    }),

    //extracts css content to separate files
    new ExtractTextPlugin('[name].[contenthash].css'),

    new CopyWebpackPlugin([
        { from: 'node_modules/respond.js/dest/respond.min.js', to: './' },
        { from: 'node_modules/html5shiv/dist/html5shiv.min.js', to: './' },
    ]),

    //minifies JS code
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true,
        },
        sourceMap: true,
    })
]);

module.exports = configs;