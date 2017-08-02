const webpack = require('webpack');
const projectConfigs = require("../project.configs.js");
const path = require("path");

module.exports = {
    entry: {
        main: projectConfigs.INDEX_JS_PATH
    },
    output: {
        path: projectConfigs.BUILD_PATH,
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
    }
};

function rules() {
    return [{
        test: /.js$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: 'jshint-loader'
    },
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
    }
    ];
}