const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');


module.exports = {
    entry: {
        'theme': './src/theme.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/build/assets',
        publicPath: '/',
        filename: '[name].js'
    },
    cache: false,
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?includePaths[]=' + path.resolve(__dirname, './src/styles'))
            },
            { 
                exclude: /node_modules/,
                test: /\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: 'file-loader?name=[name].[ext]'
            },
            { 
                exclude: /node_modules/,
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    devServer: {
        contentBase: './'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ 'vendor', /* filename= */ 'vendor.bundle.js'),
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({
          browsers: ['last 2 versions']
        })
    ]
};
