 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");

 module.exports = {
     entry: {
         app: './src/index.js',
     },
     plugins: [
         new HtmlWebpackPlugin({
             template: './src/index.html'
         }),
         new MiniCssExtractPlugin(),
     ],
     output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist'),
         clean: true,
     },
     module: {
         rules: [{
                 test: /\.css$/i,
                 use: [MiniCssExtractPlugin.loader, "css-loader"],
             },
             {
                 test: /\.(png|jpe?g|gif)$/i,
                 use: [{
                     loader: 'file-loader',
                 }, ],
             },
         ],
     },
 };