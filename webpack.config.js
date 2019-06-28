const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin= require('friendly-errors-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    watch: true,
    target: 'node',
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
		// cleanup dist/
		new CleanWebpackPlugin(),
		// Ask Webpack to display meaningful error messages
		new FriendlyErrorsWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
};