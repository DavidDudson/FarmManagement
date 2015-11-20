module.exports = () => {

    var rm = require('rimraf');
    var path = require('path');
    var webpack = require('webpack');

    rm(path.resolve('./dist'),() => console.log("Failed to delete dist"));

    webpack({
        entry: './src/client/webpack.js',
        output: {path: './dist/public', filename: 'bundle.js'},
        module: {
            loaders: [
                {test: /\.css$/, loader: "style!css"},
                {test: /\.(scss|sass)$/, loader: "style!sass"},
                {test: /\.js$/, loader: "babel"},
                {test: /\.html$/, loader: "html"},
                {test: /\.(png|jpg|gif|bmp)$/, loader: "url?prefix=img/&limit=5000"},
                {test: /\.(woff|woff2)(\?|$)/, loader: "url?limit=5000&minetype=application/font-woff"},
                {test: /\.(eot|ttf|svg)(\?|$)/, loader: "file?prefix=font/"}
            ]
        },
        resolve: {
            modulesDirectories: ['node_modules']
        }
    });

    console.log("Webpack Rebuilt")
};