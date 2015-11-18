var express = require('express');
var webpack = require('webpack');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

port = process.env.PORT || 9000;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


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
}, function (err, stats) {
    console.log(err);
    console.log(stats.toJson());
});