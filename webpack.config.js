const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { includes } = require('lodash');

const indextInput = './src/index.html';
const indexOutput = 'index.html';

module.exports = {
    module:{
        rules:[{
            test: /\.s[ac]ss$/i, 
            use: [
                "style-loader",
                "css-loader",
                {
                    loader:'sass-loader',
                    options:{
                        sourceMap:true,
                        sassOptions:{
                            outputStyle:"compressed",
                        }
                    }
                }
            ],
            include:[path.resolve(__dirname, 'src/')],
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: indexOutput, 
            template: indextInput,
        }),
        new MiniCSSExtractPlugin({
            filename: "index.css"
        })
    ],
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
    },
    entry: ["./src/index.js","./src/index.scss"], //relative to root of the application
    output: {
        filename: "./index.js", //relative to root of the application
        path: path.join(__dirname, 'dist'),
    },
};