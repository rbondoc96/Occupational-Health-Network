const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

module.exports = {
    entry: {
        vendor: "./src/vendor.js",
        main: "./src/main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },{
                test: /\.html$/,
                use: [
                    "html-loader",
                ],
            },{
                test: /\.hbs$/,
                loader: "handlebars-loader"  
            },{
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs",
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "OCH Net",
            filename: "index.html",
            template: "src/views/template.hbs"
        }),
        new HtmlWebpackPlugin({
            title: "Settings",
            filename: "settings.html",
            template: "src/views/template.hbs"
        }),
        new FaviconsWebpackPlugin("src/assets/nav main logo mini.svg"),
    ],
};