const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.ts"
    },
    devtool: "sourcemap",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "hello",
            template: "public/index.html"
        }),
    ],
    devServer: {
        open: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}

