const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const ROOT_FOLDER = path.resolve(__dirname, '..');
const BUILD_PATH = path.resolve('./build');


module.exports = {
    context: ROOT_FOLDER,
    entry: {
        main: './src/index/index.js',
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
        // {
        //     test: /\.css$/,
        //     use: ['style-loader', 'postcss-loader'],
        // },
        // {
        //     test: /\.(woff|woff2|eot|ttf)$/,
        //     use: 'url-loader'
        // },
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
        new HtmlWebpackPlugin({
            template: 'src/index/index.html'
        }),
        // new ExtractTextPlugin('[contenthash].css'),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Promise: 'promise-polyfill'
        }),

        //its better to leave it in commons-configs to test the
        //behavior of commons chunk file both in dev and prod envs.
        //Creates a 'vendor.js' file containing all files imported 
        //from node_modules
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),

        //creates a 'manifest.js' file containing all webpack's runtime code (all the common modules from vendor and main bundles)
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
    ];
}