const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { includes } = require('lodash');

const indextInput = './src/index.html';
const indexOutput = 'index.bundle.html';

module.exports = {

    entry: ["./src/index.js","./src/index.js"], //relative to root of the application
    output: {
        filename: "./index.bundle.js" //relative to root of the application
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: indexOutput, 
            template: indextInput,
        }),
        new MiniCSSExtractPlugin({
            filename: "index.bundle.css"
        })
    ],
    module:{
        rules:[{
            test: /\.scss$/, 
            use: [
                MiniCSSExtractPlugin.loader,
                "css-loader",   
                "sass-loader",
                {
                    loader:'sass-loader',
                    options:{
                        sourceMap:true,
                        sassOption:{
                            outputStyle:"compressed"
                        }
                    }
                }
            ],
            include:[path.resolve(__dirname, 'src/')],
        }]
    },
    mode:"development",
    externals:{
        lodash:"_",
        leaflet:"L"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        filename:"index.html",
        compress: true,
        port: 9000
    }
};