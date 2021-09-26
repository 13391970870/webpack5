const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: '/',
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: path.resolve(__dirname, '../node_modules'),
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    devServer: {
        compress: true,
        port: 9000,
        client: {
            overlay: true, //发生错误时，显示在浏览器上
        },
        hot: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'wp5',
            template: path.join(__dirname,'../public/index.html')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            }
        ],
    },
}