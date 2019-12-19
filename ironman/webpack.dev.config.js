const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path =require('path');

module.exports = merge.smart(webpackBaseConfig, {
    devtool: '#source-map',
    // devtool: '#eval-source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader?sourceMap',
                    'css-loader',
                    'autoprefixer-loader'
                ]
            },

            {
                test: /\.sass/,
                loader: [
                    'style-loader?sourceMap',
                    'sass-loader',
                    'autoprefixer-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            BROWSER_ENV:JSON.stringify('development')
        }),
    ],
    // devServer:{
    //     host: '192.168.199.217',
    //     proxy: {
    //         '/v1/*': {
    //             target: 'http://apizza.cc/mock/3bec46997c278b6203fe5883230d07c5',
    //             changeOrigin: true 
    //         }  
    //     },
    //     quiet: true
    // }
});