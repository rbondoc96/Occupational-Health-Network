const path = require("path")
const common = require("./webpack.common")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const {merge} = require("webpack-merge")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: '[name]-bundle-[contentHash].js',
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"        
    },
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin(),
    //         new HtmlWebpackPlugin({
    //             template: "./src/views/template.hbs",
    //             minify: {
    //                 removeComments: true,
    //                 collapseWhitespace: true,
    //             }
    //         })
    //     ]
    // },
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
            filename: "[name].[contentHash].css",
        }),
        new CleanWebpackPlugin(),
    ],
})