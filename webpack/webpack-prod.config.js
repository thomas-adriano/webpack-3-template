const configs = require('./webpack-commons.config.js');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Merge = require('webpack-merge');

module.exports = Merge(configs, {
    // https://webpack.js.org/configuration/output/#output-publicpath
    // The value of the option is prefixed to every URL created 
    // by the runtime or loaders.
    output: {
        publicPath: '',
    },
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: '10000', //10kb max
                    name: '[hash].[ext]' //pass to file-loader
                }
            }, {
                loader: 'image-webpack-loader',
                query: {
                    pngquant: {
                        optimizationLevel: 7,
                        interlaced: true,
                        quality: '65-90',
                        speed: 4
                    },
                    mozjpeg: {
                        progressive: true,
                        quality: 75
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
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            }),
        },
        {
            test: /\.html$/,
            exclude: path.join(configs.context, 'src/index/index.html'),
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        }
        ],
    },
    plugins: [
        //generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
            template: 'src/index/index.html',
            title: 'Webpack 3 Template',
            chunksSortMode: 'dependency',
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
            }
        }),

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

        //minifies JS code
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            sourceMap: true,
        }),
        //specifies global loader options. All loaders will receive these options.
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        //it's always better if OfflinePlugin is the last plugin added
        //makes this webapp offline ready by caching all (or some) of the webpack output assets.
        new OfflinePlugin(),

        //represents bundle content as convenient interactive zoomable treemap.
        //accessible at port 8888
        new BundleAnalyzerPlugin()
    ]
});