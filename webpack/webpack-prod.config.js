const configs = require('./webpack-commons.config.js');
const webpack = require('webpack');

configs.devtool = 'cheap-module-source-map';
// https://webpack.js.org/configuration/output/#output-publicpath
// This is an important option when using on-demand-loading 
// or loading external resources like images, files, etc. 
// If an incorrect value is specified you'll receive 404 
// errors while loading these resources.
// The value of the option is prefixed to every URL created 
// by the runtime or loaders. Because of this the value of 
// this option ends with /
configs.output.publicPath = 'http://localhost:8081/';
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
}, ]);

configs.plugins = configs.plugins.concat([
    //generate identifiers that are preserved over builds (prod version)
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true,
        },
        sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
    }),
]);

module.exports = configs;