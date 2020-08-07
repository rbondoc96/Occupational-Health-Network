const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin")

module.exports = {
    entry: {
        main: "./src/main.js",
        vendor: "./src/vendor.js",
        location: "./src/js/location.js",
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
                    {
                        loader: "html-loader",
                    }
                ],
            },{
                test: /\.(png|svg|jpg|gif|ico|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "imgs",
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "OCH Net",
            filename: "index.html",
            template: "src/views/template.html",
            chunks: ["main", "vendor"]
        }),
        new HtmlWebpackPlugin({
            title: "Settings",
            filename: "settings.html",
            template: "src/views/template.html",
            chunks: ["main", "vendor"]
        }),
        new HtmlWebpackPlugin({
            filename: "location.html",
            template: "src/views/location_template.html",
            chunks: ["main", "location", "vendor"]
        }),
        // new FaviconsWebpackPlugin({
        //     logo: "src/assets/nav main logo mini.svg",
        // }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/views/partials/sidebar.html"),
            priority: "high",
            location: "body",
            template_filename: "*",
        }),
    ],
};