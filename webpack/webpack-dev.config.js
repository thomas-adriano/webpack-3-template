const webpack = require('webpack');
const configs = require('./webpack-commons.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const GlobalizePlugin = require("globalize-webpack-plugin");
const OfflinePlugin = require('offline-plugin');
const cldrLikelySubtags = require("cldr-data/supplemental/likelySubtags");
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
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                exclude: path.join(configs.context, 'src/index/index.html'),
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            }
        ],
    },
    plugins: [
        //generate identifiers that are preserved over builds
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        //generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
            template: 'src/index/index.html',
            title: 'Webpack 3 Template',
            chunksSortMode: 'dependency',
            alwaysWriteToDisk: true //works in conjunction with html-webpack-harddisk-plugin
        }),
        //creates the html file even in webpack-dev-server sessions
        new HtmlWebpackHarddiskPlugin(),

        //replaces module IDs with paths to the modules 
        //keeps module IDs stable as they aren't derived based on order. 
        new webpack.NamedModulesPlugin(),

        new GlobalizePlugin({
            production: false,
            developmentLocale: "en", // locale to be used for development.
            supportedLocales: ["en", "pt"], // locales that should be built support for.
            messages: "i18n/[locale].json", // custom messages
            output: "i18n/[locale].[hash].js", // build output.
        }),
        //it's always better if OfflinePlugin is the last plugin added
        //makes this webapp offline ready by caching all (or some) of the webpack output assets.
        // new OfflinePlugin({ responseStrategy: 'network-first' })
    ]
});