module.exports = () => {
    var webpack = require('webpack');

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
};