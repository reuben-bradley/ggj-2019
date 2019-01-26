const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        game: path.resolve(__dirname, 'src/js/index.js')
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/'
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'static'),
        publicPath: '/',
        host: '0.0.0.0',
        port: 2019
    },
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](phaser|three)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};
