const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const SRC_DIR = './src/';

const include = [
    path.resolve(__dirname, SRC_DIR)
];

module.exports = {
    entry: SRC_DIR + 'index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                include
            },
            {
                loader: 'ts-loader',
                test: /\.ts(x?)$/,
                include
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
                include
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({template: SRC_DIR + 'index.html'}),
        new MiniCssExtractPlugin({ filename: "style.css" })
    ],
    devServer:{
        port: 9000
    },
    mode : devMode ? 'development' : 'production'
};
