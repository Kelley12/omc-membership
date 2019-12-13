const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')

const resolve = (...paths) => path.resolve(__dirname, ...paths);

module.exports = {
    entry: resolve("app.ts"),
    output: {
        path: resolve("..", "..", "dist", "client"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "views": resolve("views"),
            "assets": resolve("assets"),
            "public": resolve("public")
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                    appendTsSuffixTo: [/\.vue$/]
                },
            },
            { test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/, loader: "file-loader" },
            { test: /\.(html)$/, loader: "html-loader" },
            {
                test: /\.css$/, use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "OMC Membership",
            favicon: "assets/favicon.ico",
            files: ["/bundle.js", "bundle.js.gz"]
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ]
}
