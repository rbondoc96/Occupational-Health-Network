const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin")

module.exports = {
    entry: {
        main: "./src/main.js",
        vendor: "./src/vendor.js",
        home: "./src/js/home.js",
        dashboard: "./src/js/dashboard.js",
        explore: "./src/js/explore.js",
        addLocation: "./src/js/location/create.js",
        settings: "./src/js/settings.js",
        disclaimer: "./src/js/disclaimer.js",
        login: "./src/js/login-register.js",
        logout: "./src/js/logout.js",
        location: "./src/js/location/detail.js",
        reviews: "./src/js/reviews.js",
        reviewLocation: "./src/js/review-location.js",
        reviewSubmitted: "./src/js/popups/review-submitted.js",
        updateLocation: "./src/js/location/update.js",
        deleteLocation: "./src/js/location/delete.js",
        hideMainContent: "./src/js/hide-main-content.js",
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
            template: "src/views/home.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "home"]
        }),
        new HtmlWebpackPlugin({
            filename: "views/404.html",
            template: "src/views/404.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor"]
        }),        
        new HtmlWebpackPlugin({
            title: "Explore the Network",
            filename: "views/explore.html",
            template: "src/views/explore.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "explore"]
        }), 
        new HtmlWebpackPlugin({
            title: "Dashboard",
            filename: "views/dashboard.html",
            template: "src/views/dashboard.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "dashboard"]
        }),           
        new HtmlWebpackPlugin({
            title: "Bookmarks",
            filename: "views/bookmarks.html",
            template: "src/views/bookmarks.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "dashboard"]
        }),                 
        new HtmlWebpackPlugin({
            title: "Sign In or Register",
            filename: "login-register.html",
            template: "src/views/login_register.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "login"]
        }),
        new HtmlWebpackPlugin({
            title: "Logged Out",
            filename: "views/logout.html",
            template: "src/views/logout.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "logout"]
        }),          
        new HtmlWebpackPlugin({
            title: "Settings",
            filename: "views/settings.html",
            template: "src/views/settings.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "settings"]
        }), 
        new HtmlWebpackPlugin({
            filename: "views/popups/login-register.html",
            template: "src/views/login_register.html",
            chunks: ["main", "vendor", "hideMainContent", "login"]
        }),          
        new HtmlWebpackPlugin({
            filename: "views/popups/disclaimer.html",
            template: "src/views/popups/disclaimer.html",
            chunks: ["main", "hideMainContent", "disclaimer"]
        }),  
        new HtmlWebpackPlugin({
            filename: "views/popups/review_location.html",
            template: "src/views/popups/review_location.html",
            chunks: ["main", "hideMainContent", "reviewLocation"]
        }),     
        new HtmlWebpackPlugin({
            filename: "views/popups/review_submitted.html",
            template: "src/views/popups/review_submitted.html",
            chunks: ["main", "hideMainContent", "reviewSubmitted"]
        }),                      
        new HtmlWebpackPlugin({
            filename: "views/location/detail.html",
            template: "src/views/location/detail.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "location", "vendor"]
        }),
        new HtmlWebpackPlugin({
            filename: "views/location/update.html",
            template: "src/views/location/update.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "updateLocation"]
        }),          
        new HtmlWebpackPlugin({
            filename: "views/location/delete.html",
            template: "src/views/location/delete.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "deleteLocation"]
        }),        
        new HtmlWebpackPlugin({
            filename: "views/location/create.html",
            template: "src/views/location/create.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "vendor", "addLocation"]
        }),        
        new HtmlWebpackPlugin({
            filename: "views/reviews.html",
            template: "src/views/reviews.html",
            favicon: "./src/assets/favicon.ico",
            chunks: ["main", "reviews", "vendor"]
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
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/views/partials/head_styles.html"),
            priority: "low",
            location: "head",
            template_filename: "*",
        }),
    ],
};