const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin")

module.exports = {
    entry: {
        main: "./src/main.js",
        vendor: "./src/vendor.js",
        home: "./src/js/home.js",
        login: "./src/js/login-register.js",
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
                            outputPath: "assets",
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
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "home"]
        }),
        new HtmlWebpackPlugin({
            title: "Explore the Network",
            filename: "explorer.html",
            template: "src/views/explorer.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor"]
        }), 
        new HtmlWebpackPlugin({
            title: "Dashboard",
            filename: "views/dashboard.html",
            template: "src/views/dashboard.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor"]
        }),                  
        new HtmlWebpackPlugin({
            title: "Sign In or Register",
            filename: "login-register.html",
            template: "src/views/login_register.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "login"]
        }),       
        new HtmlWebpackPlugin({
            title: "Settings",
            filename: "settings.html",
            template: "src/views/template.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor"]
        }),
        new HtmlWebpackPlugin({
            filename: "location.html",
            template: "src/views/location_template.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "location", "vendor"]
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/views/partials/sidebar.html"),
            priority: "high",
            location: "body",
            template_filename: "*",
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/views/partials/footer.html"),
            priority: "low",
            location: "body",
            template_filename: "*",
        }),
    ],
};