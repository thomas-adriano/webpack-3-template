const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");

const path = require('path');

const ROOT_FOLDER = path.resolve(__dirname, '..');
const BUILD_PATH = path.resolve('./build');


module.exports = {
    context: ROOT_FOLDER,
    entry: {
        main: './src/index/index.js'
    },
    output: {
        path: BUILD_PATH,
    },
    module: {
        rules: rules()
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src'),
            path.resolve('./assets')
        ]
    },
    plugins: plugins()
};

function rules() {
    return [
        // {
        //     test: /.js$/,
        //     exclude: /node_modules/,
        //     enforce: 'pre',
        //     use: 'jshint-loader'
        // },
        {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: 'url-loader'
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: { limit: '10000' } //10kb max
            }]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader'],
        },
        // {
        //     test: /\.html$/,
        //     use: [{
        //         loader: 'html-loader',
        //         options: {
        //             interpolate: true,
        //             attrs: ['img:src', 'link:href']
        //         }
        //     }]
        // }
    ];
}

function plugins() {
    return [
        //generate different icons for iOS devices, Android devices and the Desktop browser out of this js.png file.
        new FaviconsWebpackPlugin('./assets/favicon/js.png'),

        //generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
            template: 'src/index/index.html',
            title: 'Webpack 3 Template',
            excludeChunks: ['html5respond'],
            chunksSortMode: 'dependency',
            alwaysWriteToDisk: true //works in conjunction with html-webpack-harddisk-plugin
        }),

        //simulates a good old window object property
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            Promise: 'promise-polyfill'
        }),

        //Creates a 'vendor.js' file containing all files imported 
        //from node_modules
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                let isNodeModule = module.context && module.context.indexOf('node_modules') !== -1;
                return isNodeModule;
            }
        }),

        //extracts the webpack manifest into a separate json file
        new ChunkManifestPlugin({
            filename: 'webpack-manifest.json',
            manifestVariable: 'webpackManifest',
            inlineManifest: true //write the manifest output into the html-webpack-plugin.
        }),

        //webpack hashing routines (hash, chunkhash) generates the hash in an indeterministic way.
        //because of this, this plugin is used to make chunkhash works like contenthash.
        new WebpackChunkHash(),

    ];
}