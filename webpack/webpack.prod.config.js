const configs = require("./webpack.commons.config.js");
const projectConfigs = require("../project.configs.js");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const extractCSS = new ExtractTextPlugin("[name].[contenthash].css");
const extractSASS = new ExtractTextPlugin("[name].[contenthash].css");
const extractLESS = new ExtractTextPlugin("[name].[contenthash].css");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Merge = require("webpack-merge");
const INDEX_HTML_ROOT_RELATIVE_PATH = projectConfigs.getRootRelativePath(
    projectConfigs.INDEX_HTML_PATH
);

module.exports = Merge(configs, {
    // https://webpack.js.org/configuration/output/#output-publicpath
    output: {
        publicPath: projectConfigs.PUBLIC_PATH
    },
    devtool: "cheap-module-source-map",
    output: {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    module: {
        rules: rules()
    },
    plugins: plugins()
});

function rules() {
    return [
        // {
        //     test: /\.(gif|png|jpe?g|svg)$/,
        //     use: [
        //         {
        //             loader: "url-loader",
        //             options: {
        //                 limit: projectConfigs.INLINE_ASSETS_MAX_SIZE_IN_BYTES, //10kb max
        //                 name: "[hash].[ext]" //pass to file-loader
        //             }
        //         }
        //     ]
        // },
        {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: projectConfigs.INLINE_ASSETS_MAX_SIZE_IN_BYTES,
                        name: "[hash].[ext]" //pass to file-loader
                    }
                }
            ]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: projectConfigs.INLINE_ASSETS_MAX_SIZE_IN_BYTES, //10kb max
                        name: "[hash].[ext]" //pass to file-loader
                    }
                },
                {
                    loader: "image-webpack-loader",
                    query: {
                        pngquant: {
                            optimizationLevel: 7,
                            quality: "65-90",
                            speed: 4
                        },
                        mozjpeg: {
                            progressive: true,
                            quality: 75
                        },
                        gifsicle: {
                            optimizationLevel: 7,
                            optimizationLevel: 2
                        }
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader"]
            })
        },
        {
            test: /\.scss$/,
            use: extractSASS.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader", "sass-loader"]
            })
        },
        {
            test: /\.less$/,
            use: extractLESS.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader", "less-loader"]
            })
        },
        {
            test: /\.html$/,
            exclude: projectConfigs.INDEX_HTML_PATH,
            use: [
                {
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }
            ]
        }
    ];
}

function plugins() {
    return [
        //generate identifiers that are preserved over builds
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),

        //generate different icons for iOS devices, Android devices and the Desktop browser out of this js.png file.
        new FaviconsWebpackPlugin(projectConfigs.FAVICON_PATH),

        //webpack hashing routines (hash, chunkhash) generates the hash in an indeterministic way.
        //because of this, this plugin is used to make chunkhash works like contenthash.
        new WebpackChunkHash(),

        //replaces module IDs with hashes of the modules
        //keeps module IDs stable as they aren't derived based on order.
        new webpack.HashedModuleIdsPlugin(),

        //generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
            template: INDEX_HTML_ROOT_RELATIVE_PATH,
            title: projectConfigs.APP_TITLE,
            chunksSortMode: "dependency",
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),

        //extracts webpack's manifest and injects into index head section
        new InlineChunkManifestHtmlWebpackPlugin({
            filename: "manifest.json", // manifest.json is default
            manifestVariable: "webpackManifest", // webpackManifest is default
            chunkManifestVariable: "webpackChunkManifest", // webpackChunkManifest is default; use in html-webpack-plugin template
            dropAsset: true
        }),

        //Creates a 'vendor.js' file containing all files imported
        //from node_modules
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function(module) {
                let isNodeModule =
                    module.context &&
                    module.context.indexOf("node_modules") !== -1;
                return isNodeModule;
            }
        }),

        //specifies global loader options. All loaders will receive these options.
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        //minifies JS code
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: false
            },
            sourceMap: true
        }),

        //extracts css content to separate files
        extractCSS,
        extractSASS,
        extractLESS,

        //adds async tags to script elements
        new ScriptExtHtmlWebpackPlugin({
            preload: /\.js$/,
            sync: /vendor\./,
            defaultAttribute: "async"
        }),

        //generates .gz versions of all webpack's processed assets
        new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			minRatio: 0.8
        }),
        
        //represents bundle content as convenient interactive zoomable treemap.
        //accessible at port 8888
        new BundleAnalyzerPlugin({ analyzerMode: "static" }),

        //it's always better if OfflinePlugin is the last plugin added
        //makes this webapp offline ready by caching webpack output assets.
        new OfflinePlugin({ responseStrategy: "network-first" })
    ];
}
