const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //分析工具
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const fs = require('fs');
// var path = require('path');

// fs.open('./src/config/env.js', 'w', function(err, fd) {
//     const buf = 'export default "production";';
//     fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
// });

module.exports = merge.smart(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader:'babel-loader?cacheDirectory=true',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'sass-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        scss: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'sass-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.sass/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            // {
            //     test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            //     loader: 'url-loader?limit=1024'
            // },
            // {
            //     test: /\.(html|tpl)$/,
            //     loader: 'html-loader'
            // }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest'],
            filename: '[name].[chunkhash:8].js',
            minChunks: Infinity
        }),
        new BundleAnalyzerPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     minChunks: function (module, count) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //             module.resource && /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            BROWSER_ENV: JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './index_tpl.html',
            inject: true
        }),
        new CleanWebpackPlugin(
            ['dist','index_prod.html']
        )
    ]
});