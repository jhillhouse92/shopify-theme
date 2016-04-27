module.exports = {
    entry: [
        './client/src/index.js'
    ],
    output: {
        path: __dirname + '/client/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                exclude: /node_modules/,
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './'
    }
};
