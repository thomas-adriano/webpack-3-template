const webpack = require('webpack');
const configs = require('./webpack.commons.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const Merge = require('webpack-merge');
const projectConfigs = require("../project.configs.js");
const INDEX_HTML_ROOT_RELATIVE_PATH = projectConfigs.getRootRelativePath(projectConfigs.INDEX_HTML_PATH);

module.exports = Merge(configs, {
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
    },
    module: {
        rules: rules(),
    },
    plugins: plugins(),
    devServer: {
        port: projectConfigs.DEV_SERVER_PORT,
        host: projectConfigs.DEV_SERVER_HOST,
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal'
    }
});

function rules() {
    return [
        {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: 'url-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: ['file-loader']
        },
        {
            test: /\.html$/,
            exclude: projectConfigs.INDEX_HTML_PATH,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: false
                }
            }]
        }
    ];
}

function plugins() {
    return [
        //generate identifiers that are preserved over builds
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        //generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
            template: INDEX_HTML_ROOT_RELATIVE_PATH,
            title: projectConfigs.APP_TITLE,
            chunksSortMode: 'dependency',
            alwaysWriteToDisk: true //works in conjunction with html-webpack-harddisk-plugin
        }),
        //creates the html file even in webpack-dev-server sessions
        new HtmlWebpackHarddiskPlugin()
    ];
}