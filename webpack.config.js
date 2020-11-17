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
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'resolve-url-loader'},
                    {
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
            {
                test: /\.(jpeg|jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    output: {
                        outputPath: path.join(__dirname, "/dist"),
                        filename: "img",
                        publicPath: "./../img"
                    },
                    name: '[name].[ext]',

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