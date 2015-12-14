var path = require('path');

var WebpackNotifierPlugin = require('webpack-notifier');

var homedir = path.resolve(__dirname + '/../');

module.exports = {
    entry: path.resolve(homedir ,'src/client/app/app.js'),
    debug: true,
    devtool: 'source-map',
    output: {
    path: path.resolve(homedir, 'dist/public'),
        publicPath:  '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(scss|sass)$/, loader: "style!css?sourceMap!resolve-url?sourceMap!sass?sourceMap"},
            {test: /\.jsx?$/, loader: "babel", query: {presets: ['es2015']}},
            {test: /\.html$/, loader: "html"},
            {test: /\.(png|jpg|gif|bmp)$/, loader: "url?prefix=img/&limit=5000"},
            {test: /\.(woff|woff2)(\?|$)/, loader: "url?limit=5000&minetype=application/font-woff&name=fonts/[name].[ext]"},
            {test: /\.(eot|ttf|svg)(\?|$)/, loader: "file?prefix=font/&name=fonts/[name].[ext]"}
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(homedir, "node_modules/compass-mixins/lib")
        ]
    },
    resolve: {
        root: {
            __dirname
        },
        alias: {
            "angular_material_css": "angular-material/angular-material.min.css",
                "angular_data_table_css": "angular-material-data-table/dist/md-data-table.min.css"
        },
        extensions: ['', '.js', '.scss']

    },
    plugins: [
        new WebpackNotifierPlugin()
    ]
};