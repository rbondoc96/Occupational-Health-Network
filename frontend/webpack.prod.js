const path = require("path")
const common = require("./webpack.common")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const {merge} = require("webpack-merge")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, "../cldb/static"),
        publicPath: "/static/"        
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: "all",
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,    // Extract CSS to files
                    "css-loader",   // CSS to CommonJS
                    "sass-loader",  // Sass to CSS
                ],
            },
        ],
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                context: "node_modules/@webcomponents/webcomponentsjs",
                from: "**/*.js",
                to: "webcomponents",
            }]
        }),
    ],
})