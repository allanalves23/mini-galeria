const buildmode = process.env.NODE_ENV !== 'production'
const wp = require('webpack')
const mini_css_e = require('mini-css-extract-plugin')
const optimize_css = require('optimize-css-assets-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin')
const copy_webpack_plugin = require('copy-webpack-plugin')

module.exports = {
    mode: buildmode ? 'development': 'production',
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    devServer: {
        contentBase: './build',
        port: 3000
    },
    optimization: {
        minimizer: [
            new uglifyjs({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimize_css({})
        ]
    },
    plugins: [
        new mini_css_e({
            filename: "style.css"
        }),
        new copy_webpack_plugin([
            {context: 'src/', from: '**/*.html'},
            {context: 'src/', from: 'imgs/**/*'}
        ])
    ],
    module: {
        rules:[
            {
                test: /\.s?[ac]ss$/,
                use: [/*'style-loader', */ mini_css_e.loader,'css-loader','sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)$/,
                use: ['file-loader']
            }
        ]
    }
}