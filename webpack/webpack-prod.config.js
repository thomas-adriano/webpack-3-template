const configs = require('./webpack-commons.config.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
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
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
            }
        ],
    },
    plugins: [
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
                warnings: true,
            },
            sourceMap: true,
        }),
        //specifies global loader options. All loaders will receive these options.
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
});