const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    {loader: 'style-loader'},
                    // Translates CSS into CommonJS
                    {loader: 'css-loader'},
                    {loader: 'resolve-url-loader'},
                    {
                        // Compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options:
                    {
                        pretty: true
                    }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.pug"
        })
    ]
};